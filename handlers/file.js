const {UserFile} = require("../models/dbConnect")
const {errorHandler} = require("../decorator/errorHandler")
const {message} = require("../utils/messageGenerator");
const { createNewFileName } = require("../utils/createName");

const findFileHandler = async (file_name) => {
  const userFile = await UserFile.findOne({
    attributes: ["user_id", "file_id", "file_name", "access"],
    where: { file_name, is_deleted: false }
  })

  if(!userFile){
    return message(false, "UserFile not found")
  }else{
    return message(true, "Found userFile", userFile.dataValues)
  }
}

const deleteFileHandler = async (file_name, user_id) => {
  const userFile = await UserFile.findOne({
    attributes: ["user_id", "file_id", "file_name", "access"],
    where: { file_name, is_deleted: false }
  })
  if(!userFile){
    return message(false, "Unable to delete userFile! Userfile requested for deletion not found!")
  }

  const deleteUserFile = await userFile.update({ is_deleted: true })
  if(!deleteUserFile){
    return message(false, "Unable to delete userFile")
  }else{
    return message(true, "Deleted userFile", userFile.dataValues)
  }
}

const createFileHandler = async (user_id, ext, access="public") => {
  const file_name = createNewFileName(ext)
  console.log(file_name)
  const userFile = await UserFile.create({
    user_id, file_name, is_deleted: false, access, file_type: (ext===""?null: ext)
  })
  console.log(userFile)
  if(!userFile){
    return message(false, "Unable to CREATE userFile")
  }else{
    return message(true, "CREATED userFile", userFile.dataValues)
  }
}

const updateFileHandler = async (file_name, user_id, access, ext) => {
  const deleteFileResponse = await deleteFileHandler(file_name, user_id)
  if(!deleteFileResponse || !deleteFileResponse.status){
    return message(false, 'D: Unable to update user file')
  }
  const createFileResponse = await createFileHandler(user_id, ext? ext: deleteFileResponse.body.file_type, access)
  if(!createFileResponse || !createFileResponse.status){
    return message(false, 'C: Unable to update user file')
  }else{
    return message(true, 'Updated user file', createFileResponse.body)
  }
}



module.exports = {
  findFileHandler: errorHandler(findFileHandler),
  createFileHandler: errorHandler(createFileHandler),
  updateFileHandler: errorHandler(updateFileHandler),
  deleteFileHandler: errorHandler(deleteFileHandler),
}