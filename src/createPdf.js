/*
  We use the html created with createHtml as input to
  create a pdf file as output
*/
const wkhtmltopdf = require('wkhtmltopdf')
const fs = require('fs')

const options = {
  pageHeight: '1080px',
  pageWidth: '1920px',
  marginBottom: 0,
  marginLeft: 0,
  marginTop: 0,
  marginRight: 0,
  disableSmartShrinking: true
}


const createPdf = (html, outputPath, cb) => {
  /*
  const outputOptions = Object.assign({
    output: outputPath
  }, options)
  */
  const stream = fs.createWriteStream(outputPath, {flags: 'w', encoding: 'utf-8'})

  stream.on('open', function() {
    wkhtmltopdf(html, options).pipe(stream)
  })

  stream.on('error', (err) => {
    stream.close()
    cb(err)
  })

  stream.on('end', () => {
    stream.close()
    cb()
  })

  return true
}
exports.createPdf = createPdf


/*


const templatePath = path.resolve(__dirname, '..', 'src', 'template.html')
const parseLogFolder = require('../src/parseLogFolder.js')
const testFolderPath = path.resolve(__dirname, 'photo-log')
const workshop = parseLogFolder.parseLogFolder(testFolderPath, 'photo-log.json')
const toBase64 = require('../src/toBase64.js')
const withBase64 = toBase64.replacePaths(workshop)
const result = createHtml.compileTest(withBase64, templatePath)
fs.writeFileSync(path.resolve(__dirname, 'test.html'), result, 'utf-8')
assert.equal(true, true)
})

it('should create a pdf from html', function(done) {
const templatePath = path.resolve(__dirname, '..', 'src', 'template.html')
const parseLogFolder = require('../src/parseLogFolder.js')
const testFolderPath = path.resolve(__dirname, 'photo-log')
const workshop = parseLogFolder.parseLogFolder(testFolderPath, 'photo-log.json')
const toBase64 = require('../src/toBase64.js')
const withBase64 = toBase64.replacePaths(workshop)
const result = createHtml.compileTest(withBase64, templatePath)
const pdf = require('html-pdf')
const wkhtmltopdf = require('wkhtmltopdf')

const options = {
  output: 'out.pdf',
  pageHeight: '1080px',
  pageWidth: '1920px',
  marginBottom: 0,
  marginLeft: 0,
  marginTop: 0,
  marginRight: 0,
  disableSmartShrinking: true
}

pdf.create(result, options).toFile('./out.pdf', (error, res) => {
  if(error) {
    return done(error)
  }
  return done()
})
wkhtmltopdf(result, options)

*/
