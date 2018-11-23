var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'images/' }); //setting the default folder for multer

const exec = require('await-exec');

const Post = require('../models/post');
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  // const info = [
  //   {data: 'it so hard how con i do for study react-native'},
  //   {data: 'it for test'},
  //   {data: 'networking with node.js server'},    
  // ]
  // res.json(info)
});

router.post('/hashtag', async(req, res, next) => {
  // console.log(req.body);
  // console.log("POST POST");
  var tag_data = "#"+req.body.tag;
  // console.log(tag_data);

  var user = await User.findOne({token:req.body.token});
  user.score += 1;
  const info = {data:'success'}; 
  
  var postimg = new Post({
    author : user._id,
    img : req.body.path,
    hashtag : req.body.hashtag,
    recycle : tag_data, 
  });
   
  // console.log("post " + postimg);
  // console.log("user " + user);
  await postimg.save();
  await user.save();
  res.json(info);
});

//other imports and code will go here
router.post('/img',upload.single('photo'), async(req, res,next) => {
  // var image_path = req.file.path;
  
  var image_path = req.file.path;
  console.log(req.file.path);
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
  console.log();
  var hashtag = stdout.split(" ")[0]
  
  var info = { 
    tag : hashtag,
    path : req.file.path
  }
  console.log (info);
  res.json(info);
});

router.get('/imglist', async(req, res, next) => {
  posts = await Post.find().limit(10);
  console.log(posts);
  res.json(posts);
});

router.get('/images/:id', async(req, res, next) => {
  console.log(req.params);
  let path = "images/"+req.params.id;
  fs.readFile(path, function(error , data){
    console.log(error);
    res.contentType('image/png');
    res.send(data);
  });
});
module.exports = router;