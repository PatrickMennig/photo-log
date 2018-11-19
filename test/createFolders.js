const assert = require('assert')
const createFolders = require('../src/createFolders.js')
const path = require('path')
const fs = require('fs-extra')


const photoLogJson = {
    "photo-log": "Created with photo-log utility",
    "workshop": {
        "title": "Demo Innovation Workshop",
        "subtitle": "01./02. Januar 2018, K-Town",
        "moderators": [
            "Max Mustermann",
            "Maria Musterfrau"
        ],
        "parts": [
            {
                "title": "Participants",
                "showInIndex": true
            },
            {
                "title": "Motivation",
                "showInIndex": true
            },
            {
                "title": "Problemsammlung",
                "showInIndex": true
            },
            {
                "title": "Problemdetails",
                "showInIndex": true
            },
            {
                "title": "Kaffeepause",
                "showInIndex": false
            }
        ]
    }
}

describe('createFolders', function () {

  beforeEach(function() {
    //TODO create test folder
    fs.mkdirSync(path.resolve(__dirname, 'test-createFolders'))
    fs.writeFileSync(path.resolve(__dirname, 'test-createFolders', 'photo-log.json'), JSON.stringify(photoLogJson, null, 4), 'utf-8')
  })


  it('should return true (no error) for valid log folder', function() {
    const result = createFolders.createFolders(path.resolve(__dirname, 'test-createFolders'), 'photo-log.json', 'index.json')
    assert(result)
  })

  //TODO corret assertion to test actual implementation

  afterEach(function() {
    // delete test folder
    fs.removeSync(path.resolve(__dirname, 'test-createFolders'))
  })

})
