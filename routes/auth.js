var express = require('express');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/', function(req, res, next) {
  console.log(req.body);
  const info = {data:"success"}
  res.json(info);
});
module.exports = router;
