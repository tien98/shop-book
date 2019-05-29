var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Product = require('../models/products');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find({}, function(err, data){
    res.render('shop/index', { title: 'Home', data : data });
  });
});
router.get('/user/resignter', (req, res, next) =>{
    var messages = req.flash('error');
    res.render('user/resignter', {title: 'Resignter' , csrfToken: req.csrfToken(), messages : messages, hashErrors: messages.length >0 });
});
router.post('/user/resignter', passport.authenticate('local.resignter',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/resignter',
    failureFlash: true
}));
router.get('/user/profile',(req, res, next)=>{
    res.render('user/profile');
})
module.exports = router;
