const fs = require('fs')
const path = require('path')
const resolvePaths = require('./resolvePaths.js')


const createFolders = (currentPath, logFileName, indexFileName) => {
  // check if we are in photo-log dir is already done by parent fn
  // read photo-log.json
  // parse session structure
  // create folders to put images into
  // done
  try {
    currentPath = resolvePaths.sanitizeHomePath(currentPath)

    const photoLog = fs.readFileSync(path.resolve(currentPath, logFileName), 'utf-8')
    const photoLogJson = JSON.parse(photoLog)

    const {workshop} = photoLogJson
    const {parts} = workshop

    parts.forEach((part, i) => {
      const dirname = `${i+1}_${part.title}`
      fs.mkdirSync(path.join(currentPath, dirname))
      fs.mkdirSync(path.join(currentPath, dirname, '1_introSlides'))
      fs.mkdirSync(path.join(currentPath, dirname, '2_results'))
      fs.mkdirSync(path.join(currentPath, dirname, '3_impressions'))
    })

    const contents = parts.filter((part) => part.showInIndex)
    const contentInIndex = contents.map((content) => content.title)
    fs.writeFileSync(path.join(currentPath , indexFileName), JSON.stringify(contentInIndex, null, 4), 'utf-8')

    return true
  } catch(err) {
    console.error(err)
    return false
  }
}
exports.createFolders = createFolders
