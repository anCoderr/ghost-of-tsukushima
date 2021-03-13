const LOG = require("../utils/log")

const Sequelize = require('sequelize')
const configs = require("../configs/db.config.js")
const generateUser = require("./User.js")
const generateUserProfile = require("./UserProfile.js")
const generateUserEntry = require("./UserEntry.js")
const generateUserFile = require("./UserFile.js")
const generateUserToken = require("./UserToken.js")

// Sequelize connection
const sequelize = new Sequelize({
  dialect: configs.DIALECT,
  host: configs.HOST,
  port: configs.PORT,
  username: configs.USERNAME,
  password: configs.PASSWORD,
  database: configs.DATABASE,
  pool: configs.POOL,
  logging: false
})

// Get models
const User = generateUser(sequelize)
const UserEntry = generateUserEntry(sequelize)
const UserProfile = generateUserProfile(sequelize)
const UserFile = generateUserFile(sequelize)
const UserToken = generateUserToken(sequelize)

// Establish relationships
User.hasMany(UserEntry, {foreignKey: 'user_id'})
User.hasMany(UserFile, {foreignKey: 'user_id'})
User.hasMany(UserToken, {foreignKey: 'user_id'})
User.hasOne(UserProfile, {foreignKey: "user_id"})
UserProfile.belongsTo(User, {foreignKey: "user_id"})

const connectDB = async (forceReset = false) => {
  try{
    LOG.info('Attempting connection with database...')
    await sequelize.authenticate()
    await sequelize.sync({force: forceReset})
    LOG.info("Dropped and resynced database\nConnection has been established successfully.")
    LOG.message("-----------------------------------DB INIT COMPLETE-----------------------------------")
  }catch(error){
    LOG.error('Unable to connect to the database:', error)
  }
}

const db = {
  User, UserProfile, UserEntry,
  UserFile, UserToken,
  ROLES: ["user", "admin", "moderator"],
  sequelize: sequelize,
  Sequelize: Sequelize,
  connectDB: connectDB,
}

module.exports = db