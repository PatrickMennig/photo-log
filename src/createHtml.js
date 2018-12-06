/*
  The input data is the workshopStore object created with parseLogFolder.
  It contains all necessary information about the workshop
  and the absolute paths to the images to include.
*/

const handlebars = require('handlebars')
const fs = require('fs')


const createHtml = (workshopStore, templatePath, withImpressions = true) => {
  const source = fs.readFileSync(templatePath, 'utf-8')
  const template = handlebars.compile(source)
  const result = template(withImpressions ? workshopStore : justResults(workshopStore))
  return result
}
exports.createHtml = createHtml


const justResults = (workshopStore) => {
  const store = JSON.parse(JSON.stringify(workshopStore))
  store.sessions = workshopStore.sessions.map((s) => {
    const onlyResults = JSON.parse(JSON.stringify(s))
    onlyResults.imagePaths.impressions = []
    return onlyResults
  })
  store.index = store.index.map((i) => {
    const onlyResults = JSON.parse(JSON.stringify(i))
    i.begin = i.beginOnlyResults
    return onlyResults
  })
  return store
}
exports.justResults = justResults
