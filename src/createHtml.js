/*
  The input data is the workshopStore object created with parseLogFolder.
  It contains all necessary information about the workshop
  and the absolute paths to the images to include.
*/

const handlebars = require('handlebars')
const fs = require('fs')


const createHtml = (workshopStore, templatePath) => {
  const source = fs.readFileSync(templatePath, 'utf-8')
  const template = handlebars.compile(source)
  const result = template(workshopStore)
  return result
}
exports.createHtml = createHtml




// just for testing handlebars
const compileTest = (data, templatePath) => {
  const fs = require('fs')
  const source = fs.readFileSync(templatePath, 'utf-8')
  const template = handlebars.compile(source)
  const result = template(data)
  return result
}
exports.compileTest = compileTest
