const assert = require('assert')
const checks = require('../src/checks.js')
const path = require('path')


describe('checks', function() {

  describe('isDir', function() {
    it('should return true for a folder', function() {
      assert.equal(checks.isDir(__dirname), true)
    })
    it('should return true for a home path folder', function() {
      assert.equal(checks.isDir('~/Desktop'), true)
    })
    it('should return false for a file', function() {
      assert.equal(checks.isDir(__filename), false)
    })
    it('should return false for non existent path', function() {
      assert.equal(checks.isDir('random'), false)
    })
  })

  describe('isPhotoLog', function() {
    it('should return true for a photo log folder', function() {
      assert.equal(checks.isPhotoLog(path.join(__dirname, 'photo-log'), 'photo-log.json'), true)
    })
    it('should return false for a different folder', function() {
      assert.equal(checks.isPhotoLog(path.join(__dirname, 'no-photo-log'), 'photo-log.json'), false)
    })
  })
})
