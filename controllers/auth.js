
const LOG = require("../utils/log.js")
const { createUserProfile } = require('../handlers/profile')
const { createUser, verifyUserRegistration, verifyUserPassword,
   createUserRegistrationToken, validateToken, createSigninToken,
   checkIfPresent, findOneUser, findExistingSigninToken,
   deleteExistingUserSigninToken, validateExistingUserSigninToken
  } = require('../handlers/index.js')
const { message } = require('../utils/messageGenerator')
const { errorHandlerMiddleware } = require('../decorator/errorHandler')


const signup = async (req, res, next) => {
  try{
    const {username, password, email, name} = req.body
    LOG.info("[signup] Request received: ", req.body)

    const presenceCheck = await checkIfPresent(username, email)
    LOG.info("[signup] Presence check status! ", presenceCheck)
    if(presenceCheck.status){
      return res.status(500).send({...presenceCheck, status: false})
    }
    
    const userProfile = await createUserProfile({name})
    LOG.info("[signup] Created user profile! ", userProfile)
    if(!userProfile.status){
      return res.status(500).send(userProfile)
    }

    const user = await createUser({username, email, profile_id: userProfile.body.profile_id, password})
    LOG.info("[signup] Created user! ", user)
    if(!user.status){
      return res.status(500).send(user)
    }

    const userToken = await createUserRegistrationToken({user_id: user.body.user_id, email: user.body.email})
    LOG.info("[signup] Created user email verification token! ", userToken)

    if(user.status && userProfile.status && userToken.status){
      LOG.message("[signup] User registration complete!,")
      return res.status(201).send(message(true, "User created!", {username, name, token: userToken.body.token, expire_ts: userToken.body.expiration_time}))
    }else{
      LOG.message("[signup] User registration failed!,")
      return res.status(500).send(message( false, "User not created. Error occurred while account creation!"))
    }
  } catch(e) {
    LOG.error("Error occurred! Error: ", e, message(false, "INTERVAL SERVER ERROR"))
      return res.status(500).send(message(false, "INTERVAL SERVER ERROR"))
  }
}

/**
 * @method PUT
 * @param {token} req 
 * @param {msg, status} res 
 * @param {fn} next 
 * Steps: 
 * - Extract user and email from jwt
 * - Check for token in table (type - verify token)
 * - Check for expiration time
 * - If checks out - set is_active = is_registered = true
 */
const verifyUserAccount = async (req, res, next) => {
  const {token} = req.query
  LOG.info("[verifyUserAccount] Req received!")

  const validationResult = await validateToken(token, 'verification')
  LOG.info("[verifyUserAccount] Token validation result has been receieved!", validationResult)
  if(!validationResult || !validationResult.status){ return res.status(500).send(validationResult) }

  const decToken = validationResult.body
  let user = await findOneUser({
    user_id: decToken.user_id, email: decToken.email
  })
  LOG.info("[verifyUserAccount] User found response rcv! User: ", user)
  if(!user || !user.status){ return res.status(500).send(user) }

  const userRegistrationResponse = await verifyUserRegistration(user.body.user_id)
  LOG.info("[verifyUserAccount] User registration values updated!", userRegistrationResponse) 

  if(userRegistrationResponse && userRegistrationResponse.status){
    return res.status(200).send(message(true, "User registered!"))
  }else{
    return res.status(500).send(message("Internal server error! Token was found but sth went wrong.", false))
  }
}

/**
 * 
 * @param {username, password, email} req 
 * @param {*} res 
 * ~ steps
 * ~ - check if adequate info is provided or not
 * ~ - check if user with username or email is present or not
 * ~ - compare password hash in db with provided password hash
 * ~ - create token, add to table, send response
 */
const signin = async (req, res, next) => {

  const {username, email, password} = req.body
  LOG.info('[Signin] req received. params: ', username, email, 'super-secret-password')

  const verificationResponse = await verifyUserPassword(username, email, password)
  LOG.info('[Signin] reveived verification response ', verificationResponse)
  if(!verificationResponse || !verificationResponse.status){ res.status(401).send(verificationResponse) }

  const user_id = verificationResponse.body.user_id
  const user_email = verificationResponse.body.email

  const oldUserToken = await findExistingSigninToken(user_id)
  LOG.info("[Signin] Old user login token response", oldUserToken)
  if(oldUserToken && oldUserToken.status){ return res.status(200).send(oldUserToken) }    

  const signinToken = await createSigninToken(user_id, user_email)
  LOG.info("[Signin] Token creation response", signinToken)

  if( signinToken && signinToken.status ){ return res.status(200).send({token: signinToken.body.token, expiration_time: signinToken.body.expiration_time}) }    
  else{ return res.status(500).send(signinToken) }
}

const signout = async (req, res, next) => {
  const token = req.headers.authorization
  LOG.info('[Signout] req received. params: ', token) 
  // LOG.info('[Signout] req received. params: ', "Token-is-a-secret") 

  const deleteTokenResponse = await deleteExistingUserSigninToken(token)
  LOG.info('[Signout] delete signout response rcv.ed. Response: ', token)

  if( deleteTokenResponse.status ){ return res.status(200).send(deleteTokenResponse) }    
  else{ return res.status(500).send(deleteTokenResponse) }
}

const validateUser = async (req, res, next) => {
  const token = req.headers.authorization
  LOG.info('[validateUser] req received. params: ', "Token-is-a-secret") 

  const validateTokenResponse = await validateExistingUserSigninToken(token)
  LOG.info('[validateUser] validate user token response rcv. Response: ', validateTokenResponse)

  if( validateTokenResponse.status ){ return res.status(200).send(validateTokenResponse) }    
  else{ return res.status(500).send(validateTokenResponse) }

}

module.exports = {
  signin: errorHandlerMiddleware(signin), 
  signout: errorHandlerMiddleware(signout), 
  signup: errorHandlerMiddleware(signup), 
  validateUser: errorHandlerMiddleware(validateUser), 
  verifyUserAccount: errorHandlerMiddleware(verifyUserAccount)
}