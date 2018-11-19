const fs = require('fs')
const path = require('path')
const resolvePaths = require('./resolvePaths.js')


const isDir = (folderPath) => {
  try {
    return fs.lstatSync(resolvePaths.sanitizeHomePath(folderPath)).isDirectory()
  } catch(err) {
    return false
  }
}
exports.isDir = isDir

const isPhotoLog = (folderPath, logFile) => {
  try {
    const file = fs.readFileSync(path.join(resolvePaths.sanitizeHomePath(folderPath), logFile), 'utf-8')
    const json = JSON.parse(file)
    return json.hasOwnProperty('photo-log')
  } catch(err) {
    return false
  }
}
exports.isPhotoLog = isPhotoLog
