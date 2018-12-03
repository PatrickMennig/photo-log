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
})
