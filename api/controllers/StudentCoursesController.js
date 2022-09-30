
module.exports = {
     create:async(req, res)=>{
        try {
            var params = req.allParams();
            if (!params.subject) return res.ok({ status: false, err: "subject is required Field" });
            if (!params.studentId) return res.ok({ status: false, err: "student id is required" });
            await StudentCourses.create({
                subject: params.subject,
                type: params.type,
                priority: params.priority,
                deadline: new Date(params.deadline),
                status: params.status,
                studentId: params.studentId
            })
            res.ok({ msg: "student courses added successfully", status: true })

        } catch (err) {
            res.serverError({ status: false, err })
        }
    },
    async getCoursesByStudentId(req, res) {
        try {
                var params = req.allParams()
               let StudentCourse = await StudentCourses.find({studentId:params.id}).populate("studentId");
            res.json({ status: true, data: StudentCourse })
        } catch (err) {
            res.serverError({ status: false, err })
        }
    },
    async update(req, res) {
        try {
            var params = req.allParams();
            var attr = {}
            if (params.name) {
                attr.name = params.name
            }
            if (params.email) {
                attr.email = params.email
            }
            if (params.mobileNumber) {
                attr.mobileNumber = params.mobileNumber
            }
            if (params.address) {
                attr.address = params.address
            }
            var updatedUser = await Student.update({ id: req.params.id }).set(attr)
            res.ok({ status: true, updatedUser })
        } catch (err) {
            res.serverError({ status: false, err })
        }
    },
    async deleteById(req, res) {
        try {
            let students = await Student.destroy({
                id: req.params.id
            });
            res.ok({ status: true, students })
        } catch (err) {
            res.serverError({ status: false, err })
        }
    }

}