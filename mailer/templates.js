const templates = {
  "FORGOT_PASSWORD": "Hi, sorry to hear you lost your password. Click here the OTP you need to reset it. OTP: {OTP} If not you, please ignore.",
  "VERIFY_ACCOUNT": "Hi {NAME}, We feel good to have you with us. Click here to verify your account. <a href={VERIFICATION_LINK} target='_blank'>Click here</a>. This link is only valid till {EXPIRATION_TIME}.",
  "PASSWORD_CHANGE": "Hi, your password for EVERROVER was changed at {TIME}. If not you, please click here. <a href={DOUBT_LINK} target='_blank'>Click here</a>",
  "RESET_CHANGE": "Hi, your password for EVERROVER was reset at {TIME}. If not you, please click here. <a href={DOUBT_LINK} target='_blank'>Click here</a>",
}

module.exports = {
  ...templates
}