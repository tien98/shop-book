var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');


var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/logout',isLoggedIn, (req, res, next)=>{
  req.logout();
  res.redirect('/');
});
router.get('/profile',isLoggedIn, (req, res, next)=>{
  res.render('user/profile', {title: 'Profile'});  
});
router.use('/', notLoggedIn, (req , res, next) =>{
  next();
})
/* GET users listing. */
router.get('/resignter', (req, res, next) =>{
  var messages = req.flash('error');
  res.render('user/resignter', {title: 'Resignter' , csrfToken: req.csrfToken(), messages : messages, hashErrors: messages.length >0 });
});
router.post('/resignter', passport.authenticate('local.resignter',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/resignter',
  failureFlash: true
}));
router.get('/login', (req, res, next) =>{
var messages = req.flash('error');
res.render('user/login', {title: 'Login' , csrfToken: req.csrfToken(), messages : messages, hashErrors: messages.length >0 });
});
router.post('/login', passport.authenticate('local.login',{
successRedirect: '/',
failureRedirect: '/user/login',
failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
