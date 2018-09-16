var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const info = [
    {data: 'it so hard how con i do for study react-native'},
    {data: 'it for test'},
    {data: 'networking with node.js server'},    
  ]
  res.json(info)
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  console.log("POST POST");
});

module.exports = router;