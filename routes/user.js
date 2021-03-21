const express = require('express')

const {
  checkPresence
} = require("../controllers/user.js")

const router = express.Router()

router.get('/check-presence', checkPresence)
router.get('/get-me', checkPresence)
router.post('/change-me', checkPresence)
router.delete('/remove-me', checkPresence)

module.exports = router