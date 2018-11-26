var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'images/' }); //setting the default folder for multer

const exec = require('await-exec');

const Post = require('../models/post');
const User = require('../models/user');


router.post('/hashtag', async(req, res, next) => {
  var tag_data = "#"+req.body.tag;
  var user = await User.findOne({id:req.body.id});
  user.score += 1;
   
  var recycleimgpath = "/public/images" + req.body.tag;
  var postimg = new Post({
    author : user._id,
    img : req.body.path,
    hashtag : req.body.hashtag,
    recycle : tag_data, 
    recycleimg : recycleimgpath,
  });
   
  await postimg.save();
  await user.save();
  res.json(postimg);
});

//other imports and code will go here
router.post('/img',upload.single('photo'), async(req, res,next) => {  
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
  posts = await Post.find().populate('author').limit(10);
  console.log(posts);
  res.json(posts);
});

router.post('/myimglist', async(req, res, next) => {
  console.log(req.body.id);
  user = await User.findOne({id:req.body.id});
  console.log(user);
  posts = await Post.find({author:user._id}).populate('author').limit(10);
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