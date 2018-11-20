var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' }); //setting the default folder for multer

const exec = require('await-exec')

/* GET home page. */
router.get('/', function(req, res, next) {
  // const info = [
  //   {data: 'it so hard how con i do for study react-native'},
  //   {data: 'it for test'},
  //   {data: 'networking with node.js server'},    
  // ]
  // res.json(info)
});

router.post('/hashtag', function(req, res, next) {
  console.log(req.body);
  console.log("POST POST");
  res.json();
});


//other imports and code will go here
router.post('/img',upload.single('photo'), async(req, res,next) => {
  // var image_path = req.file.path;
  
  var image_path = req.file.path;
  fs.readFile(req.file.path,(err, contents)=> {
    if (err) {
    console.log('Error: ', err);
    }else{
    console.log('File contents ',contents);
    }
  });
  
  var cmd = 'python \
  ./tfmodel/label_image.py \
  --graph=./tfmodel/output_graph.pb \
  --labels=./tfmodel/output_labels.txt \
  --input_layer=Placeholder \
  --output_layer=final_result \
  --image=./' + image_path;
    
  const { stdout, stderr } = await exec(cmd);
  console.log(stdout.split(" ")[0]);
  
});

module.exports = router;