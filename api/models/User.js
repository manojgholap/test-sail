const bcrypt = require('bcrypt');
module.exports = {
  attributes: {
    name:{
      type:"string",
      required:true
    },
    password:{
      type:"string"
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
    token:{
      type:"string"
    }
  },
  beforeCreate(values, next) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            sails.log.error(err);
            return next();
        }
        bcrypt.hash(values.password, salt, (err, hash) => {
            if (err) {
                sails.log.error(err);
                return next();
            }
            values.password = hash;
            return next();
        });
    });
},
comparePassword(password, encryptedPassword) {

    return new Promise(function(resolve, reject) {
      
        bcrypt.compare(password, encryptedPassword, (err, match) => {
            if (err) {
                sails.log.error(err);
                return reject("Something went wrong!");
            }
            if (match) return resolve();
            else return reject("Invalid Credentials");
        });
    });
}
};

