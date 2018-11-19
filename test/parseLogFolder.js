const assert = require('assert')
const parseLogFolder = require('../src/parseLogFolder.js')
const fs = require('fs')
const path = require('path')


describe('parseLogFolder', function() {

  describe('toBase64', function() {

    it('should convert an image to base64 without failing', function() {
      const imagePath = path.resolve(__dirname, 'images', 'raw', '01.jpg')
      const base64Test = fs.readFileSync(path.resolve(__dirname, 'images', 'base64', '01.txt'), 'utf-8')
      const result = parseLogFolder.toBase64(imagePath)
      assert(result)
    })
  })


  describe('imagePathsInDir', function() {

    it('should return an array of all images in a dir', function() {
      const images = parseLogFolder.imagePathsInDir(path.resolve(__dirname, 'images', 'raw'))
      const expected = ['01.jpg', '02.JPG']
      assert.equal(images.toString(), expected.toString())
    })
  })


  describe('imageFolderPathsForPart', function() {

    it('should return the paths to image folders in a photo-log dir', function() {
      const paths = parseLogFolder.imageFolderPathsForPart(path.resolve(__dirname, 'photo-log'), 'Motivation', '2')
      const expected = [
        path.resolve(__dirname, 'photo-log', '2_Motivation', '1_introSlides'),
        path.resolve(__dirname, 'photo-log', '2_Motivation', '2_results'),
        path.resolve(__dirname, 'photo-log', '2_Motivation', '3_impressions')
      ]
      assert.equal(paths.toString(), expected.toString())
    })
  })


  describe('endsWith', function() {

    it('should return true if file name ends with one given extension', function() {
      const res = parseLogFolder.endsWith('test.jpg', ['.jpg'])
      assert.equal(res, true)
    })

    it('should return true if file name ends with one of the given extensions', function() {
      const res = parseLogFolder.endsWith('test.jpg', ['.jpg', '.jpeg', '.png'])
      assert.equal(res, true)
    })

    it('should return false if file name does not end with one of the given extensions', function() {
      const res = parseLogFolder.endsWith('test.txt', ['.jpg', '.jpeg', '.png'])
      assert.equal(res, false)
    })

    it('should return false if extensions is empty', function() {
      const res = parseLogFolder.endsWith('test.txt', [])
      assert.equal(res, false)
    })
  })

})
