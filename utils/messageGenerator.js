const message = (status, message, body=undefined) => {
  const response = {
    status, message, body
  }
  return response
}

const errorMessage = (status, message, error) => {
  if(!(status instanceof Boolean)){
    return null
  }
  if(!(message instanceof String)){
    return null
  }
  return {
    status, message, error
  }
}

module.exports = {message, errorMessage}