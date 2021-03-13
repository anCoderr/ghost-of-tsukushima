const User = require('../models/dbConnect.js').User

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user=>{
    if(user){
      res.status(400).send({
        message: "Username already in use!"
      })
      return
    }
    User.findOne({
      email: req.body.email
    }).then(user=>{
      if(user){
        req.status(400).send({
          message: "Email already in use!"
        })
        return
      }
      next()
    })
  })
}


module.exports = {
  checkDuplicateUsernameOrEmail
}