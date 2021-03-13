const userHandler = require('./user');
const profileHandler = require('./profile');
const tokenHandler = require('./token');
const fileHandler = require('./file');

module.exports = {
  ...userHandler, ...profileHandler, ...tokenHandler, ...fileHandler
}