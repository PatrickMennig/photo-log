const fs = require('fs')


const toBase64 = (imagePath) => {
  const image = fs.readFileSync(imagePath)
  const base64 = new Buffer(image).toString('base64')
  return base64
}
exports.toBase64 = toBase64

const replacePaths = (workshopStore) => {
  const store = Object.assign({}, workshopStore)
  const sessions = workshopStore.sessions.map((session) => {
    const altered = Object.assign({}, session)
    altered.imagePaths.introSlides = session.imagePaths.introSlides.map((path) => toBase64(path))
    altered.imagePaths.results = session.imagePaths.results.map((path) => toBase64(path))
    altered.imagePaths.impressions = session.imagePaths.impressions.map((path) => toBase64(path))
    return altered
  })
  store.sessions = sessions
  return store
}
exports.replacePaths = replacePaths
