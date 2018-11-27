var express = require('express');
var router = express.Router();

const User = require('../models/user');

router.post('/', async(req, res, next) => {
  // console.log(req.body);
  const info = {data:"success"}

  var user = await User.findOne({id:req.body.id});
  if (!user){
    user = new User({
      name : req.body.name,
      id : req.body.id,
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
  var user = await User.findOne({id:req.body.id});

  var info = {
    name: user.name,
    picture: user.facebook.photo,
    score: user.score,
  }
  console.log(info);
  res.json(info);
});

router.get('/list', async(req, res, next) => {
  var user = await User.find();
  console.log(user);
  res.json(user);
})
module.exports = router;
