
const jwt = require('jsonwebtoken');

module.exports = {
    signIn(data) {
        return jwt.sign(data, sails.config.custom.jwtSecret, {
            expiresIn: sails.config.custom.tokenExpireTime
        })
    },
    verify(token, callback) {
        return jwt.verify(
          token,
          sails.config.custom.jwtSecret,
          {},
          callback 
        );
      },
      decode(token){
        return jwt.decode(token)
      }
}