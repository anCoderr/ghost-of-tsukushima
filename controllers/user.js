/***
 * 1. Create user
 * 2. Delete user
 * 3. Update username
 * 4. Get user data except password
 * 5. Reset & change password
 * 6. Fetch all users- admin
 */
const LOG = require("../utils/log.js")
const { checkIfPresent } = require("../handlers")
const { message } = require("../utils/messageGenerator")

const checkPresence = async(req, res, next) => {
  try{
    const {username, email} = req.query
    LOG.info("[checkPresence] Request received! Params: ", username, email)
    const response = checkIfPresent(username, email)
    LOG.info("[checkPresence] Sending response!", response)

    if(response.status){
      return res.status(200).send(response)
    }else{
      return res.status(500).send(response)
    }
  }catch(e){
    LOG.error("[checkPresence] Some error occurred!, Error: ", e)
    return res.status(500).send(message(false, "Internal error occurred"))
  }
}


module.exports = {
  checkPresence
}