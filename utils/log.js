const colors = require('colors');

class LOG{
  constructor(caller){
    this.caller = caller
    this.callingFunction = null
    console.log(("Logger created - caller="+caller).gray.bold)
  }

  setCallingFunction = (callingFunction) => {
    this.callingFunction = callingFunction
  }

  callguard = (str) => {console.log(`[${this.caller.magenta.bold}] ${this.callingFunction? `[${this.callingFunction.magenta.bold}]`: ""} ${str}`)}

  error = (str, err) => {
    this.callguard(str.red.bold.underline)
    if(err) console.log(err.red)
  }
  info = (str) => { this.callguard(str.cyan) }
  message = (str) => { this.callguard(str.green) }
  boldMessage = (str) => { this.callguard(str.green.bold) }
  route = str => { this.callguard(str.bold.italic.blue) }
  general = str => { this.callguard(str.yellow) }
}

const error = (str, ...err) => {
  console.log(str.red, ...err)
}

const info = (str, ...args) => console.log(str.cyan, ...args)
const message = (str, ...args) => {console.log(str.green, ...args)}
const boldMessage = (str, ...args) => {console.log(str.green, ...args)}
const route = (str, ...args) => {console.log(str.bold.italic.blue, ...args)}
const general = (str, ...args) => {console.log(str.yellow, ...args)}

module.exports = {
  error, info, message, 
  route, general, boldMessage,
  LOG
}