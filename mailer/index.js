const transporter = require('./transporter');
const {
  DEFAULT_SENDER
} = require("./configs")

const generateMailContent = (mailType, content) => {
  let mailContent = null
  switch(mailType){
    case "VERIFY_ACCOUNT":
      mailContent = `Verification link: <a href="${content.link}" target="_blank">Click here</a>`;
      break
    case "FORGOT_PASSWORD":
      mailContent = `Password reset link: <a href="${content.link}" target="_blank">Click here</a>`;
      break
    default: 
      mailContent = content
      break
  }
  return mailContent
}

const sendMail = async (to, subject, mailType, content, from=DEFAULT_SENDER) => {
  try{
    const mailContent = generateMailContent(mailType, content)
    const res = await transporter.sendMail({
      to, from, subject,
      html: mailContent
    })
    console.log("Mail successfully sent! Response: ", res, ":\n", mailContent)
  }catch(e){
    console.log("Unable to send the mail! Error: ", e)
  }
}

const trialRun = async ()=>{
  try{
    const res = await transporter.sendMail({
      to: 'deyol.abhishek@gmail.com',
      from: 'travel.admin@deyolbro.com',
      subject: 'Signup verification',
      html: '<h1>Please verify your email</h1><a href="www.google.com"> <button>Verify</button>'
    })
    console.log("Mail successfully sent! Response: ", res)
  }catch(e){
    console.log("Unable to send the mail! Error: ", e)
  }
}

sendMail("deyol.abhishek@gmail.com", "Everrover: verify your email account", "VERIFY_ACCOUNT", {name: "Anurag Deyol", link: "https://github.com/abhishek123"})

module.exports = {sendMail, trialRun}
