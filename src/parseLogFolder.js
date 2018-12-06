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

const parseLogFolder = (folderPath, logFileName, workshopStore = {}) => {
  folderPath = resolvePaths.sanitizeHomePath(folderPath)

  const photoLogJson = jsonFile(path.join(folderPath, logFileName))

  const {workshop} = photoLogJson
  workshopStore.meta = {
    title: workshop.title,
    subtitle: workshop.subtitle,
    moderators: workshop.moderators
  }

  const sessions = workshop.parts.map((part, i) => sessionFromPart(part, i+1, folderPath))
  workshopStore.sessions = sessions

  const index = indexFromSessions(sessions)
  workshopStore.index = index

  return workshopStore
}
exports.parseLogFolder = parseLogFolder


const jsonFile = (pathToJson) => {
  const file = fs.readFileSync(pathToJson, 'utf-8')
  const json = JSON.parse(file)
  return json
}
exports.jsonFile = jsonFile


const indexFromSessions = (sessions) => {
  let lastPartEnd = 1
  let lastPartEndOnylResults = 1

  const index =
    sessions.map((s) => ({
      showInIndex: s.showInIndex,
      title: s.title,
      numberOfSlides: s.numberOfSlides,
      numberOfSlidesOnlyResults: s.numberOfSlidesOnlyResults
    }))
    .map((s, i, index) => {
      const altered =  Object.assign({
        begin: lastPartEnd,
        beginOnlyResults: lastPartEndOnylResults
      }, s)
      lastPartEnd += s.numberOfSlides
      lastPartEndOnylResults += s.numberOfSlidesOnlyResults
      return altered
    })
    .filter((s) => s.showInIndex)

  return index
}


const sessionFromPart = (part, i, folderPath) => {
  const session = {
    title: part.title,
    showInIndex: part.showInIndex,
    index: i,
    imagePaths: {
      introSlides: [],
      results: [],
      impressions: []
    },
    numberOfSlides: null
  }

  const imgDirPaths = imageDirPathsForPart(folderPath, session.title, session.index)
  session.imagePaths.introSlides = imagePathsInDir(path.join(imgDirPaths.introSlides))
  session.imagePaths.results = imagePathsInDir(path.join(imgDirPaths.results))
  session.imagePaths.impressions = imagePathsInDir(path.join(imgDirPaths.impressions))

  session.numberOfSlides =
    session.imagePaths.introSlides.length +
    session.imagePaths.results.length +
    session.imagePaths.impressions.length

  session.numberOfSlidesOnlyResults =
    session.imagePaths.introSlides.length +
    session.imagePaths.results.length

  return session
}
exports.sessionFromPart = sessionFromPart


//TODO refactor: this is bad style as folder names are hard coded
const imageDirPathsForPart = (rootPath, partTitle, partIndex) => ({
  introSlides: path.join(rootPath, `${partIndex}_${partTitle}` ,`1_introSlides`),
  results: path.join(rootPath, `${partIndex}_${partTitle}` ,`2_results`),
  impressions: path.join(rootPath, `${partIndex}_${partTitle}` ,`3_impressions`)
})
exports.imageDirPathsForPart = imageDirPathsForPart


const imagePathsInDir = (dirPath, extensions = ['.png', '.PNG', '.jpg', '.jpeg', '.JPG']) => {
  const images = fs.readdirSync(dirPath).map((filename) => {
    if(! endsWith(filename, extensions)) {
      return null
    }
    return path.join(dirPath, filename)
  })
  return images.filter((e) => e !== null)
}
exports.imagePathsInDir = imagePathsInDir


const endsWith = (filename, extensions) => extensions.filter((ext) => filename.endsWith(ext)).length > 0
exports.endsWith = endsWith
