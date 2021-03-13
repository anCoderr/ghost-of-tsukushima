
const LOG = require("../utils/log.js")
const { validateExistingUserSigninToken, createFileHandler, 
  deleteFileHandler, updateFileHandler, findFileHandler } = require('../handlers/index.js')
const { message } = require('../utils/messageGenerator')
const { errorHandlerMiddleware } = require('../decorator/errorHandler')
const clean = require("../utils/clean.js")

const getFileReq = (req) => {return clean({ext: req.query.ext, access: req.query.access, filename: req.params.filename, token: req.headers.authorization})}

const createFile = async (req, res, next) => {
  const {token, access, ext} = getFileReq(req)
  LOG.info("[createFile] req params rcv. ", token, access)

  const signinTokenValidationResponse = await validateExistingUserSigninToken(token)
  LOG.info("[createFile] token processed and signinTokenValidationResponse rcv. ", signinTokenValidationResponse)
  if(!signinTokenValidationResponse || !signinTokenValidationResponse.status){
    return res.status(500).send(signinTokenValidationResponse)
  }

  const fileCreationResponse = await createFileHandler(signinTokenValidationResponse.body.user_id, ext, access)
  LOG.info("[createFile] file params processed and fileCreationResponse rcv. ", fileCreationResponse)
  if(!fileCreationResponse || !fileCreationResponse.status){
    return res.status(500).send(fileCreationResponse)
  }else{
    return res.status(200).send(fileCreationResponse)
  }
}

const updateFile = async (req, res, next) => {
  const {token, filename, ext, access} = getFileReq(req)
  LOG.info("[updateFile] req params rcv. ", filename, ext)

  const findFileResponse = await findFileHandler(filename)
  LOG.info("[updateFile] filename processed and findFileResponse rcv. ", findFileResponse)
  if(!findFileResponse || !findFileResponse.status){
    return res.status(500).send(findFileResponse)
  }

  const signinTokenValidationResponse = await validateExistingUserSigninToken(token)
  LOG.info("[updateFile] token processed and signinTokenValidationResponse rcv. ", signinTokenValidationResponse)
  if(!signinTokenValidationResponse || !signinTokenValidationResponse.status){
    return res.status(500).send(signinTokenValidationResponse)
  }else if(signinTokenValidationResponse.body.user_id !== findFileResponse.body.user_id){
    return res.status(403).send(message(false, "User not allowed to update the static resource, User is not the owner of resource."))
  }else{
    const updateFileResponse = await updateFileHandler(filename, signinTokenValidationResponse.body.user_id, access, ext)
    LOG.info("[updateFile] update file handler response rcv. ", updateFileResponse)
    if(!updateFileResponse || !updateFileResponse.status){
      return res.status.send(500).send(updateFileResponse)
    } 
    
    return res.status(200).send(updateFileResponse)
  }
}

const getFile = async (req, res, next) => {
  const {token, filename} = getFileReq(req)
  LOG.info("[getFile] req params rcv. ", filename, token)

  // handle public access
  const findFileResponse = await findFileHandler(filename)
  LOG.info("[getFile] filename processed and findFileResponse rcv. ", findFileResponse)
  if(!findFileResponse || !findFileResponse.status){
    return res.status(500).send(findFileResponse)
  }else if(findFileResponse && findFileResponse.body.access === 'public'){
    return res.status(200).send(findFileResponse)
  }

  // handle private access
  const signinTokenValidationResponse = await validateExistingUserSigninToken(token)
  LOG.info("[getFile] token processed and signinTokenValidationResponse rcv. ", signinTokenValidationResponse)
  if(!signinTokenValidationResponse || !signinTokenValidationResponse.status){
    return res.status(500).send(signinTokenValidationResponse)
  }else if(signinTokenValidationResponse.body.user_id !== findFileResponse.body.user_id){
    return res.status(403).send(message(false, "User not allowed to access the static resource. Resource is private and user is not the owner of resource."))
  }else{
    return res.status(200).send(findFileResponse)
  }
}

const deleteFile = async (req, res, next) => {
  const {token, filename} = getFileReq(req)
  LOG.info("[deleteFile] req params rcv. ", filename, token)

  const findFileResponse = await findFileHandler(filename)
  LOG.info("[deleteFile] filename processed and findFileResponse rcv. ", findFileResponse)
  if(!findFileResponse || !findFileResponse.status){
    return res.status(500).send(findFileResponse)
  }

  const signinTokenValidationResponse = await validateExistingUserSigninToken(token)
  LOG.info("[deleteFile] token processed and signinTokenValidationResponse rcv. ", signinTokenValidationResponse)
  if(!signinTokenValidationResponse || !signinTokenValidationResponse.status){
    return res.status(500).send(signinTokenValidationResponse)
  }else if(signinTokenValidationResponse.body.user_id !== findFileResponse.body.user_id){
    return res.status(403).send(message(false, "User not allowed to delete the static resource, User is not the owner of resource."))
  }else{
    const deleteFileResponse = await deleteFileHandler(filename, signinTokenValidationResponse.body.user_id)
    LOG.info("[deleteFile] delete file handler response rcv. ", deleteFileResponse)
    if(!deleteFileResponse || !deleteFileResponse.status){
      return res.status.send(500).send(deleteFileResponse)
    } 
    return res.status(200).send(deleteFileResponse)
  }

}

module.exports = {
  createFile: errorHandlerMiddleware(createFile), 
  updateFile: errorHandlerMiddleware(updateFile), 
  getFile: errorHandlerMiddleware(getFile), 
  deleteFile: errorHandlerMiddleware(deleteFile)
}