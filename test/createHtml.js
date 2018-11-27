const assert = require('assert')
const createHtml = require('../src/createHtml.js')
const fs = require('fs')
const path = require('path')

describe('createHtml', function() {

  describe('compileTest', function() {

    it('should create a valid html file', function() {
      const data = {
        meta: {
          title: 'Test Title',
          subtitle: 'Test Subtitle',
          moderators: ['Max Mustermann', 'Maria Musterfrau']
        }
      }
      const expected = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <title>Test Title</title>
        </head>
        <body>
          <div class="page">
            <p>Test Title</p>
            <p>Test Subtitle</p>
            <p>Max Mustermann</p>
            <p>Maria Musterfrau</p>
          </div>
        </body>
        </html>
      `
      const result = createHtml.compileTest(data, path.resolve(__dirname, 'template.html'))
      assert.equal(result.replace(/\s+/g, '') , expected.replace(/\s+/g, '') )
    })
  })

  it('should create a html file with images', function() {

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
    /*
    pdf.create(result, options).toFile('./out.pdf', (error, res) => {
      if(error) {
        return done(error)
      }
      return done()
    })
    */
    wkhtmltopdf(result, options)
  })
})
