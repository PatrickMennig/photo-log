const fs = require('fs')
const path = require('path')
const resolvePaths = require('./resolvePaths.js')

const jsonStub = {
  "photo-log": 'Created with photo-log utility. Do not change this files name!',
  "workshop": {
    "title": "Demo Innovations Workshop",
    "subtitle": "01./02. Januar 2018, K-Town",
    "moderators": [
      "Max Mustermann",
      "Maria Musterfrau"
    ],
    "indexTitle": "Inhalt",
    "parts": [
      {
        "title": "Titelfolien",
        "showInIndex": true
      },
      {
        "title": "Teilnehmer",
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
        "showInIndex": true
      },
      {
        "title": "Outrofolien",
        "showInIndex": true
      }
    ]
  }
}

const createStub = (folderPath, mainFileName) => {
  if(fs.existsSync(folderPath)) {
    return false
  }
  let targetPath = resolvePaths.sanitizeHomePath(folderPath)
  fs.mkdirSync(targetPath)
  fs.writeFileSync(path.join(targetPath , mainFileName), JSON.stringify(jsonStub, null, 4), 'utf-8')
  return true
}
exports.createStub = createStub
