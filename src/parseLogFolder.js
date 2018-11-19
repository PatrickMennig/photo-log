const fs = require('fs')
const resolvePaths = require('./resolvePaths.js')
const path = require('path')

/*
In order to generate a pdf we have to fully parse the
photo-log folder previously create with create-stub
and create-folders.
The user then puts the workshop images into the respective
folders and runs create-pdf.

We parse the complete photo-log folder and then create a
html representation of the photo-log.

This html can then be used to generate a pdf file.
*/

const parseLogFolder = (folderPath, logFileName, indexFileName) => {
  folderPath = resolvePaths.sanitizeHomePath(folderPath)

  const photoLogJson = jsonFile(path.join(folderPath, logFileName))
  const indexJson = jsonFile(path.join(folderPath, indexFileName))

  //TODO go through all parts and get the paths to the images
  // imageFolderPathsForPart
  // imagePathsInDir

  //TODO parse the images to base64

  //TODO store the results in something reasonable

  //TODO create a reasonable structure for the index file (with page numbers)

  // actual creation of pdf from this reasonable structure is done somewhere else
}


const jsonFile = (pathToJson) => {
  const file = fs.readFileSync(pathToJson, 'utf-8')
  const json = JSON.parse(file)
  return json
}
exports.jsonFile = jsonFile


//TODO refactor: this is bad style as folder names are hard coded
const imageFolderPathsForPart = (rootPath, partName, partIndex) => {
  return [
    path.join(rootPath, `${partIndex}_${partName}` ,`1_introSlides`),
    path.join(rootPath, `${partIndex}_${partName}` ,`2_results`),
    path.join(rootPath, `${partIndex}_${partName}` ,`3_impressions`)
  ]
}
exports.imageFolderPathsForPart = imageFolderPathsForPart


const imagePathsInDir = (dirPath, extensions = ['.png', '.PNG', '.jpg', '.jpeg', '.JPG']) => {
  const images = fs.readdirSync(dirPath).map((filename) => {
    if(! endsWith(filename, extensions)) {
      return null
    }
    return filename
  })
  return images
}
exports.imagePathsInDir = imagePathsInDir


const toBase64 = (imagePath) => {
  const image = fs.readFileSync(imagePath)
  const base64 = new Buffer(image).toString('base64')
  return base64
}
exports.toBase64 = toBase64


const endsWith = (filename, extensions) => extensions.filter((ext) => filename.endsWith(ext)).length > 0
exports.endsWith = endsWith
