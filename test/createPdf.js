const assert = require('assert')
const createPdf = require('../src/createPdf.js')


describe('createPdf', function() {

  describe('createPdf', function() {

    it('should fail for invalid input', function() {
      const result = createPdf.createPdf('null', 'some.path')
      assert(result, false)
    })

  })
})
