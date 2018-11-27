const handlebars = require('handlebars')






// just for testing handlebars
const compileTest = (data, templatePath) => {
  const fs = require('fs')
  const source = fs.readFileSync(templatePath, 'utf-8')
  const template = handlebars.compile(source)
  const result = template(data)
  return result
}
exports.compileTest = compileTest
