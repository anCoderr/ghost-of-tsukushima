const express = require('express')

const {
  signin, signout, signup, verifyUserAccount, validateUser
} = require("../controllers/auth.js")

const router = express.Router()

router.post('/user/create-user', signup)
router.post('/user/signin', signin)
router.put('/user/signout', signout)
router.put('/user/verify-account/', verifyUserAccount)
router.get('/user/me', validateUser)

module.exports = router