const makeId = (length) => {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_!.:';
  for ( let i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


const createName = (initName, end=null, ext=null) => {
  const hash = makeId(8)
  const name = `${initName}_${hash}_${Date.now()}${end?"_"+end:""}${ext? "."+ext: ""}`
  return name
}

const createNewFileName = (ext) => {
  return createName("file", null, ext)
}

module.exports = {
  createName, createNewFileName
}