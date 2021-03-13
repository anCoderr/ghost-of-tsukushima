const express = require('express')

const {
  createFile, updateFile, getFile, deleteFile
} = require("../controllers/file.js")

const router = express.Router()

router.post('/', createFile)
router.put('/:filename', updateFile)
router.get('/:filename', getFile)
router.delete('/:filename', deleteFile)

module.exports = router