const SYSTEM = require("./system.js")
const TOKEN_TTL = require("./token_ttl.js")
const CONFIGS = require('./configs.js')

module.exports = {
  ...SYSTEM,
  ...TOKEN_TTL,
  ...CONFIGS
}