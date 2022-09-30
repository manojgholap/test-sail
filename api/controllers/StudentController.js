
module.exports = {
    async create(req, res) {
        try{
            var params = req.allParams();
            if (!params.name) return res.badRequest({ err: "name is required Field" });
           let student =  await Student.create({
                name: params.name,
                email: params.email,
                mobileNumber: params.mobileNumber,
                address: params.address,
            })
            res.ok({ msg: "student added successfully", status:true })
            
        }catch(err){
            res.serverError({status:false,err })
        }
    },
    async getAll(req, res) {
        try {
            
            const db = Student.getDatastore().manager;
            const rawCollection = await db.collection("student");
            const Students  = await rawCollection.aggregate([],{hint:{$natural:-1}}).toArray();
            res.ok(Students)
        } catch (err) {
            res.serverError(err)
        }
    },
    async getById(req, res) {
        try {
            let students  = await Student.findOne({
                id:req.params.id
            });
            res.ok(students)
        } catch (err) {
            res.serverError(err)
        }
    },
    async update(req, res) {
        try {
            var params = req.allParams();
            var attr = {}
            if(params.name){
                attr.name=params.name
            }
            if(params.email){
                attr.email=params.email
            }
            if(params.mobileNumber){
                attr.mobileNumber=params.mobileNumber
            }
            if(params.address){
                attr.address=params.address
            }
            var updatedUser = await Student.update({id:req.params.id}).set(attr)
            res.ok({status:true,updatedUser,msg:"student detail edited"})
        } catch (err) {
            res.serverError({status:false,err})
        }
    },
    async deleteById(req, res) {
        try {
            let students  = await Student.destroy({
                id:req.params.id
            });
            res.ok({status:true,students,msg:"student deleted"})
        } catch (err) {
            res.serverError({status:false,err})
        }
    }

}