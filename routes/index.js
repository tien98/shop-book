var express = require('express');
var router = express.Router();
var Product = require('../models/products');
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find({}, function(err, data){
    res.render('shop/index', { title: 'Home', data : data });
  });
});
router.get('/user/resignter', (req, res, next) =>{
    res.render('user/resignter', {title: 'Resignter' , csrfToken: req.csrfToken() });
});
router.post('/user/resignter',(req, res, next) =>{
    res.redirect('/');
});
module.exports = router;
