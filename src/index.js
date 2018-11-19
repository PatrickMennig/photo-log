const vorpal = require('vorpal')()

const checks = require('./checks.js')
const createStub = require('./createStub.js').createStub
const createFolders = require('./createFolders.js').createFolders


vorpal
  .delimiter('photolog$')
  .show()


vorpal
  .command('create-stub <path>', 'Creates new photo log folder')
  .action(function(args, cb) {
    if(checks.isDir(args.path)) {
      this.log('Error: Directory already exists at path')
      cb()
    }
    createStub(args.path, 'photo-log.json')
    cb('Photo log folder structure successfully created. Fill out details in json and run create-folders next.')
  })


vorpal
  .command('create-folders <path>', 'Creates folders to add images and info slides into.')
  .action(function(args, cb) {
    if(!checks.isDir(args.path)) {
      this.log('Error: Path is not a directory')
      return cb()
    }
    if(!checks.isPhotoLog(args.path, 'photo-log.json')) {
      this.log('Error: Path is not a photo-log directory')
      return cb()
    }
    const success = createFolders(args.path, 'photo-log.json', 'index.json')
    if(success) {
      return cb('Folder structure successfully created. Add workshop images and info slides. Then run create-log.')
    } else {
      this.log('Error: Something went wrong. Is your json file valid?')
      return cb()
    }
  })


vorpal
  .command('create-log <path>', 'Parses an existing log folder structure and outputs two pdf files')
  .action(function createLog(args, cb) {

  })
