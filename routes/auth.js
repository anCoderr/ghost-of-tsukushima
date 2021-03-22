const express = require('express')

const {
  signin, signout, signup, validateUser, verifyUserAccount
} = require("../controllers/auth.js")

const router = express.Router()

/**
 * Sign up via credentials mentioned in the form, 
 * - phone/email
 * - username
 * - password
 * - name
 * if phone is provided an OTP verification is to be made within 20minutes of creation on the displayed which will hve an verification token similar to email verification
 * in case of email the verification email is to be clicked which'll do the honours with preset token in the request body
 */
router.post('/user/create-user', signup)
router.put('/user/verify-user', verifyUserAccount)
router.post('/user/signin', signin)
router.put('/user/signout', signout)
router.get('/user/me', validateUser)
router.get('/user/forgot-password', validateUser)
router.get('/user/reset-password', validateUser)

/**
  Sign up via external connections : google, github, fb
  The external connection is to be mentioned in the :source param
 */

module.exports = router