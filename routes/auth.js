var express = require('express');
var router = express.Router();
var request = require('request');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/', async(req, res, next) => {
  console.log(req.body);
  const info = {data:"success"}

  // var data = await request({
  //   url: 'https://graph.facebook.com/v2.5/me?fields=email,name,picture',
  //   method: 'GET',
  //   qs: {
  //       "access_token": req.body.token
  //   },
  //   }, function (error, response, body) {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.send(body);
  // });


  var data = await request("https://graph.facebook.com/v2.5/me?fields=email,name,picture&access_token="+req.body.token);
  console.log(data);

  res.json(info);
});
module.exports = router;
