/***
 * 1. Update profile info
 * 2. Get profile info
 * 3. Get profile info list - admin
 */
const {UserProfile} = require("../models/dbConnect")
const logger = require("../utils/log.js").LOG
const LOG = new logger("user.js controller")

const createUserProfile = async (req, res, next) => {
  LOG.boldMessage("------------ Create user profile ------------")
  const {name} = req.body
  try{
    LOG.info(`Received sign up request: ${{name, nationality, dob, gender="unknown"}}`)
    const userProfile = await UserProfile.create({
      name, nationality, gender, dob
    })
    LOG.info(`User profile: ${userProfile} created!!`)
    if(user && userProfile){
      res.status(200).send({
        status: true,
        message: `User profile created successfully! Thank ${userProfile.name} for joining us!`,
        result: userProfile
      })
    }else{
      LOG.info(`Unable to create user`)
      res.status(500).send({
        status: false,
        result: null,
        message: `Profile creation failed! Apologize ${userProfile.name} for us failing him!`
      })
    }
  }catch(e){
    LOG.error("Error occurred:", e.message)
    res.status(500).send({
      status: false,
      message: e.message,
      result: null
    })
  }
}

module.exports = {
  createUserProfile
}