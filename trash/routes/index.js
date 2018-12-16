var express = require('express');
var path = require('path');
var apiRoutes = require("./api");

var router = express.Router();

//API Routes --------------------------------

router.use("/api", apiRoutes);

//HTML Routes -------------------------------

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

module.exports = router;