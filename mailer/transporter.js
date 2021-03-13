const nodemailer = require('nodemailer');
const {
  SERVICE, USERNAME, PASSWORD
} = require("./configs")
// var sendinBlue = require('nodemailer-sendinblue-transport');

const transporter = nodemailer.createTransport({
  service: SERVICE,
  auth: {
    user: USERNAME,
    pass: PASSWORD
  }
});

module.exports = transporter