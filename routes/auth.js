var express = require('express');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/', async(req, res, next) => {
  console.log(req.body);
  const info = {data:"success"}

  var data = await request({
    url: 'https://graph.facebook.com/v2.5/me?fields=email,name,picture',
    method: 'GET',
    qs: {
        "access_token": req.user.facebook.token
    },
    }, function (error, response, body) {
    res.setHeader('Content-Type', 'application/json');
    res.send(body);
  });
  console.log(data);
  
  res.json(info);
});
module.exports = router;
