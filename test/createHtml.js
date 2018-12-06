const assert = require('assert')
const createHtml = require('../src/createHtml.js')
const fs = require('fs')
const path = require('path')

describe('createHtml', function() {

  describe('createHtml', function() {

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
      const result = createHtml.createHtml(data, path.resolve(__dirname, 'template.html'))
      assert.equal(result.replace(/\s+/g, '') , expected.replace(/\s+/g, '') )
    })
  })

  describe('justResults', function() {

    it('should remove the impression image paths from the sessions and overwrite begin', function() {
      const expected = {
        meta: {
          title: 'Test Title',
          subtitle: 'Test Subtitle',
          moderators: ['Max Mustermann', 'Maria Musterfrau']
        },
        index: [
          {
            title: 'Participants',
            showInIndex: true,
            begin: 2,
            beginOnlyResults: 2,
            numberOfSlides: 2,
            numberOfSlidesOnlyResults: 1
          },
          {
            title: 'Motivation',
            showInIndex: true,
            begin: 3,
            beginOnlyResults: 3,
            numberOfSlides: 3,
            numberOfSlidesOnlyResults: 2
          }
        ],
        sessions: [
          {
            title: 'TitleSlides',
            showInIndex: false,
            index: 1,
            imagePaths: {
              introSlides: [path.resolve(__dirname, 'photo-log', '1_TitleSlides', '1_introSlides', '01.jpg')],
              results: [],
              impressions: []
            },
            numberOfSlides: 1,
            numberOfSlidesOnlyResults: 1
          },
          {
            title: 'Participants',
            showInIndex: true,
            index: 2,
            imagePaths: {
              introSlides: [path.resolve(__dirname, 'photo-log', '2_Participants', '1_introSlides', '01.jpg')],
              results: [],
              impressions: []
            },
            numberOfSlides: 2,
            numberOfSlidesOnlyResults: 1
          },
          {
            title: 'Motivation',
            showInIndex: true,
            index: 3,
            imagePaths: {
              introSlides: [path.resolve(__dirname, 'photo-log', '3_Motivation', '1_introSlides', '01.jpg')],
              results: [path.resolve(__dirname, 'photo-log', '3_Motivation', '2_results', '01.jpg')],
              impressions: []
            },
            numberOfSlides: 3,
            numberOfSlidesOnlyResults: 2
          }
        ]
      }
      const input = {
        meta: {
          title: 'Test Title',
          subtitle: 'Test Subtitle',
          moderators: ['Max Mustermann', 'Maria Musterfrau']
        },
        index: [
          {
            title: 'Participants',
            showInIndex: true,
            begin: 2,
            beginOnlyResults: 2,
            numberOfSlides: 2,
            numberOfSlidesOnlyResults: 1
          },
          {
            title: 'Motivation',
            showInIndex: true,
            begin: 3,
            beginOnlyResults: 3,
            numberOfSlides: 3,
            numberOfSlidesOnlyResults: 2
          }
        ],
        sessions: [
          {
            title: 'TitleSlides',
            showInIndex: false,
            index: 1,
            imagePaths: {
              introSlides: [path.resolve(__dirname, 'photo-log', '1_TitleSlides', '1_introSlides', '01.jpg')],
              results: [],
              impressions: []
            },
            numberOfSlides: 1,
            numberOfSlidesOnlyResults: 1
          },
          {
            title: 'Participants',
            showInIndex: true,
            index: 2,
            imagePaths: {
              introSlides: [path.resolve(__dirname, 'photo-log', '2_Participants', '1_introSlides', '01.jpg')],
              results: [],
              impressions: [path.resolve(__dirname, 'photo-log', '2_Participants', '3_impressions', 'IMG_2819.JPG')]
            },
            numberOfSlides: 2,
            numberOfSlidesOnlyResults: 1
          },
          {
            title: 'Motivation',
            showInIndex: true,
            index: 3,
            imagePaths: {
              introSlides: [path.resolve(__dirname, 'photo-log', '3_Motivation', '1_introSlides', '01.jpg')],
              results: [path.resolve(__dirname, 'photo-log', '3_Motivation', '2_results', '01.jpg')],
              impressions: [path.resolve(__dirname, 'photo-log', '3_Motivation', '3_impressions', '01.jpg')]
            },
            numberOfSlides: 3,
            numberOfSlidesOnlyResults: 2
          }
        ]
      }
      const result = createHtml.justResults(input)
      assert.deepEqual(result, expected)
    })
  })
})
