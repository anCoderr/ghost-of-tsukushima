const express = require('express')

const {
  checkPresence
} = require("../controllers/user.js")

const router = express.Router()

router.get('/check-presence', checkPresence)
// router.post('/user', signin)
// router.get('/user', signfout)
// router.get('/me', me)

module.exports = router