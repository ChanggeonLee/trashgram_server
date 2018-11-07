var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' }); //setting the default folder for multer

/* GET home page. */
router.get('/', function(req, res, next) {
  const info = [
    {data: 'it so hard how con i do for study react-native'},
    {data: 'it for test'},
    {data: 'networking with node.js server'},    
  ]
  res.json(info)
});

router.post('/hashtag', function(req, res, next) {
  console.log(req.body);
  console.log("POST POST");
  res.json();
});

// router.post('/img', function(req, res, next) {
//   console.log(req.body);
//   console.log(req.body.image._parts)
//   console.log("POST POST");
// });


//other imports and code will go here

router.post('/img',upload.single('photo'), (req, res,next) => {
  console.log(req.file)
  // logger.info(req.file);//this will be automatically set by multer
  // logger.info(req.body);
  //below code will read the data from the upload folder. Multer     will automatically upload the file in that folder with an  autogenerated name
  fs.readFile(req.file.path,(err, contents)=> {
    if (err) {
    console.log('Error: ', err);
    }else{
    console.log('File contents ',contents);
    }
  });
  res.json();
});

module.exports = router;