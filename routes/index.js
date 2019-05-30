var express = require('express');
var router = express.Router();
var Product = require('../models/products');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find({}, function(err, data){
    res.render('shop/index', { title: 'Home', data : data });
  });
});
module.exports = router;
