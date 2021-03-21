const LOG = require("../utils/log")
const { message } = require("../utils/messageGenerator")

const errorHandler = (funcToHandle) => {
  return (...args) => {
    try {
      const result = funcToHandle.apply(this, [...args])
      return result
    } catch (e) {
      LOG.error(funcToHandle.name+"Error occurred! error: ", e)
    }
  }
}

const errorHandlerMiddleware = (funcToHandle) => {
  return (...args) => {
    const req = args[0]
    const res = args[1]
    const next = args[2]
    try {
      const result = funcToHandle.apply(this, [...args])
      return result
    } catch (e) {
      LOG.error(funcToHandle.name+"Error occurred! Error: ", e)
      return res.status(500).send(message(false, "INTERVAL SERVER ERROR"))
    }
  }
}

const errorHandlerWith500 = async (func) => {
  return async (...args) => {
    try {
      console.log(...args)
      const result = func.apply(this, [...args])
      return result
    } catch (e) {
      LOG.error(func.name+"Error occurred! error: ", e)
      return res.status(500).send({
        message: "Some internal error occurred.",
        status: false
      })
    }
  }
}

module.exports = {
  errorHandler, errorHandlerWith500, errorHandlerMiddleware
}