const bcrypt = require('bcrypt')
module.exports = {
    register(req, res) {
        var params = req.allParams();
        if (!params.email) return res.badRequest({ err: "email is required Field" });
        if (!params.password) return res.badRequest({ err: "password is required Field" });
        User.findOne({ email: params.email })
            .then((user) => {
                if (!user) {
                    var token = jwtToken.signIn({ email: params.email })
                    User.create({
                        name: params.name,
                        email: params.email,
                        mobileNumber: params.mobileNumber,
                        address: params.address,
                        password: params.password,
                        token: token
                    }).then((user) => {
                        res.ok({ status: true, msg: "user added successfully", token })
                    }).catch((err) => {
                        res.ok({ status: false, err })
                    })
                }
                else {
                    res.ok({ status: false, err: "user all ready register with this email please use another email Id or login" })
                }
            })
            .catch((err) => {
                sails.log.error(err);
                return res.serverError();
            });
    },
    login(req, res) {
        const data = req.body;
        if (!data.email || !data.password) return res.badRequest('Email and password required');
        User.findOne({ email: data.email })
            .then((user) => {
                if (!user) return res.notFound();
                User.comparePassword(data.password, user.password)
                    .then(async () => {
                        let token = jwtToken.signIn({ email: user.email })
                        await User.update({ _id: user._id }).set({ token: token })
                        return res.send({ status: true, token });
                    })
                    .catch((err) => {
                        return res.ok({ status: false, err })
                    });
            })
            .catch((err) => {
                return res.ok({ status: false, err })
            });
    },
    async currentUser(req, res) {
        var params = req.allParams();
        var tokenData = await jwtToken.decode(params.token);
        var email = tokenData.email;
        User.findOne({
            email: email,
        }).then((user) => {
            res.ok(user)
        }).catch((err) => {
            res.serverError({ status: false, err })
        })

    }
}