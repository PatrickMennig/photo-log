const vorpal = require('vorpal')()

const checks = require('./checks.js')
const createStub = require('./createStub.js').createStub
const createFolders = require('./createFolders.js').createFolders
const parseLogFolder = require('./parseLogFolder.js').parseLogFolder
const createHtml = require('./createHtml.js').createHtml
const createPdf = require('./createPdf.js').createPdf
const replacePaths = require('./toBase64.js').replacePaths
const resolvePaths = require('./resolvePaths')
const path = require('path')
const fs = require('fs')
//to store the template from user input 
var template;


vorpal
  .delimiter('photolog$')
  .show()


vorpal
  .command('create-stub <path>', 'Creates new photo log folder')
  .action(function(args, cb) {
    if(checks.isDir(args.path)) {
      this.log('Error: Directory already exists')
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
  
  
  //Select your Template
  vorpal
  .command('select-template <template>', 'Select new template for photo log folder')
  .action(function(args, cb){
	  template=args.template;
	  var search_path=path.resolve(template);
	  fs.stat(template, function(err, search_path) {
		  if (err) {
		    console.log('Template does not exist');
		  return cb()
		  }
		  else {                
		    console.log('Template has been selected successfully.');
		  return cb()
		  }
		});	 
   })


vorpal
  .command('create-log <path>', 'Parses an existing log folder structure and outputs two pdf files')
  .action(function createLog(args, cb) {
    if(!checks.isDir(args.path)) {
      this.log('Error: Path is not a directory')
      return cb()
    }
    if(!checks.isPhotoLog(args.path, 'photo-log.json')) {
      this.log('Error: Path is not a photo-log directory')
      return cb()
    }
    // parse the log folder
    const workshopStore = parseLogFolder(args.path, 'photo-log.json')

    // replace image paths
    const withBase64 = replacePaths(workshopStore)

    // create html
    this.log('Workshop photo log creates your pdfs now... please be patient, this may take a while!')
    
    
    //Passing the template variable 
    const htmlWithImpressions = createHtml(withBase64, path.join(__dirname, template ), true)
    const htmlOnlyResults = createHtml(withBase64, path.join(__dirname, template ), false)

    //fs.writeFileSync(resolvePaths.sanitizeHomePath(path.join(args.path, 'out.html')), htmlOnlyResults)

    // create pdfs
    const pdfWithImpressions = createPdf(htmlWithImpressions, resolvePaths.sanitizeHomePath(path.join(args.path, 'photo-log-with_impressions.pdf')), (err) => {
      if(!err) {
        this.log('Photo-log with impressions created')
        return cb()
      }
      this.log('Error: Could not create pdf: ' + err)
      return cb()
    })

    const pdfOnlyResults = createPdf(htmlOnlyResults, resolvePaths.sanitizeHomePath(path.join(args.path, 'photo-log-just_results.pdf')), (err) => {
      if(!err) {
        this.log('Photo-log with just results created')
      }
      this.log('Error: Could not create pdf' + err)
    })

    //TODO wait with ending until wkhtmltopdf has finished
//    return cb()
    
  })
