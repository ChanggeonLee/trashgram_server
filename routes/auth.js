var express = require('express');
var router = express.Router();

const User = require('../models/user');

router.post('/', async(req, res, next) => {
  // console.log(req.body);
  const info = {data:"success"}

  var user = await User.findOne({token:req.body.token});
  if (!user){
    user = new User({
      name : req.body.name,
      token : req.body.token,
      facebook:{
        photo: req.body.picture,
        email: req.body.email,
      }
    });
    user.score = 0;
    console.log(user);
    await user.save();  
  }
  
  
  res.json(info);
});

/* GET users listing. */
router.post('/info', async(req, res, next) => {
  console.log(req.body);
  // var user = await User.findOne({token:req.body.token});
  var user = await User.find();
  console.log(user);
  if(user){
    var info = {
      name: user.name,
      picture: user.facebook.photo,
      score: user.score,
    }
    res.json(info);
  }
});
module.exports = router;
