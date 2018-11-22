var express = require('express');
var router = express.Router();


const User = require('../models/user');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

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
module.exports = router;
