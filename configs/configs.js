const dotenv = require('dotenv')

// set config prop file
dotenv.config({
  path: './configs/properties-dev.env'
})

const secretKey = process.env.SECRET_KEY || "my-super-secret-key-configs"
const adminUsername = process.env.ADMIN_USERNAME || "admin"
const adminPassword = process.env.SECRET_KEY || "icy-Bee3@@@@r"

module.exports = {
  secretKey, adminPassword, adminUsername
}