/**
 * 1. Create
 * 2. Update 
 * 3. Delete
 * 4. Get single entry
 * 5. Get all entries for specific user
 * 6. Get everything - admin
 */

const {UserEntry} = require("../models/dbConnect")
const configs = require("../configs/configs.js")
const LOG = require("../utils/log.js")

const createUserEntry = (req, res, next) => {

}

const updateUserEntry = (req, res, next) => {

}

const deleteUserEntry = (req, res, next) => {

}

const getUserEntry = (req, res, next) => {
  
}

const getUserEntries = (req, res, next) => {
  
}

const getAllEntries = (req, res, next) => {
  
}

module.exports = {
  createUserEntry, updateUserEntry, deleteUserEntry, 
  getUserEntry, getUserEntries, getAllEntries,
}