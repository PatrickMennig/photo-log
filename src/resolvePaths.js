const path = require('path')
const os = require('os')

const sanitizeHomePath = (somePath) => {
  if (somePath[0] === '~') {
    const newPath = somePath.slice(1)
    return path.join(os.homedir(), newPath)
  }
  return path.normalize(path.resolve(somePath))
}
exports.sanitizeHomePath = sanitizeHomePath
