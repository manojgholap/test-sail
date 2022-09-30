 module.exports = {
    attributes: {
      studentId:{
        collection:"studentcourses",
        via:"studentId"
      },
      name:{
        type:"string",
        required:true
      },
      email:{
        type:"string"
      },
      mobileNumber:{
        type:"number"
      },
      address:{
        type:"string"
      },
    },
  };
  
  