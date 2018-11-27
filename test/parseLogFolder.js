const assert = require('assert')
const parseLogFolder = require('../src/parseLogFolder.js')
const fs = require('fs')
const path = require('path')


describe('parseLogFolder', function() {

  describe('imagePathsInDir', function() {

    it('should return an array of all images in a dir', function() {
      const images = parseLogFolder.imagePathsInDir(path.resolve(__dirname, 'images', 'raw'))
      const expected = [path.resolve(__dirname, 'images', 'raw', '01.jpg'), path.resolve(__dirname, 'images', 'raw', '02.JPG')]
      assert.deepEqual(images, expected)
    })
  })


  describe('imageDirPathsForPart', function() {

    it('should return the paths to image folders in a photo-log dir', function() {
      const paths = parseLogFolder.imageDirPathsForPart(path.resolve(__dirname, 'photo-log'), 'Motivation', '2')
      const expected = {
        introSlides: path.resolve(__dirname, 'photo-log', '2_Motivation', '1_introSlides'),
        results: path.resolve(__dirname, 'photo-log', '2_Motivation', '2_results'),
        impressions: path.resolve(__dirname, 'photo-log', '2_Motivation', '3_impressions')
      }
      assert.deepEqual(paths, expected)
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


  describe('sessionFromPart', function() {

    it('should get all info and images related to a session and store it in an object', function() {
      const testFolderPath = path.resolve(__dirname, 'photo-log')
      const part = {
        title: 'Motivation',
        showInIndex: true
      }
      const sessionIndex = 2
      const expected = {
        title: 'Motivation',
        showInIndex: true,
        index: 2,
        imagePaths: {
          introSlides: [path.join(__dirname, 'photo-log', '2_Motivation', '1_introSlides', '01.jpg')],
          results: [path.join(__dirname, 'photo-log', '2_Motivation', '2_results', '01.jpg')],
          impressions: [path.join(__dirname, 'photo-log', '2_Motivation', '3_impressions', '01.jpg')]
        },
        numberOfSlides: 3
      }
      const result = parseLogFolder.sessionFromPart(part, sessionIndex, testFolderPath)
      assert.deepEqual(result, expected)
    })
  })


  describe('parseLogFolder', function() {

    it('should return the correct structure for the test workshop', function() {
      const testFolderPath = path.resolve(__dirname, 'photo-log')
      const expected = {
        meta: {
          title: 'Test Title',
          subtitle: 'Test Subtitle',
          moderators: ['Max Mustermann', 'Maria Musterfrau']
        },
        sessions: [
          {
            title: 'Participants',
            showInIndex: true,
            index: 1,
            imagePaths: {
              introSlides: [path.resolve(__dirname, 'photo-log', '1_Participants', '1_introSlides', '01.jpg')],
              results: [],
              impressions: [path.resolve(__dirname, 'photo-log', '1_Participants', '3_impressions', '01.jpg')]
            },
            numberOfSlides: 2
          },
          {
            title: 'Motivation',
            showInIndex: true,
            index: 2,
            imagePaths: {
              introSlides: [path.resolve(__dirname, 'photo-log', '2_Motivation', '1_introSlides', '01.jpg')],
              results: [path.resolve(__dirname, 'photo-log', '2_Motivation', '2_results', '01.jpg')],
              impressions: [path.resolve(__dirname, 'photo-log', '2_Motivation', '3_impressions', '01.jpg')]
            },
            numberOfSlides: 3
          }
        ]
      }
      const result = parseLogFolder.parseLogFolder(testFolderPath, 'photo-log.json')
      assert.deepEqual(result, expected)
    })
  })

})
