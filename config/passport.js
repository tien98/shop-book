var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  }); 
passport.use('local.resignter',  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function(req, email, password, done){
    req.checkBody('email', 'Invailid email').notEmpty().isEmail();
    req.checkBody('password', 'Invailid password(>4)').notEmpty().isLength({min:4});
    req.checkBody('firstname', 'Invailid firstname').notEmpty().isLength({max:15});
    req.checkBody('lastname', 'Invailid lastname').notEmpty().isLength({max:15});
    req.checkBody('address', 'Invailid address').notEmpty();
    req.checkBody('address2', 'Invailid address2').notEmpty();
    req.checkBody('city', 'Invailid city or City less than 15 ').notEmpty().isLength({max:15});
    req.checkBody('phone', 'Invailid phone or Phone is equal to 10').notEmpty().isNumeric().isLength({min: 10 , max:10});
    var errors = req.validationErrors();
    if (errors){
      var messages = [];
      errors.forEach((error) =>{
        messages.push(error.msg);
      });
      return done(null, false, req.flash('error', messages));
    }
      User.findOne({'email': email  }, function (err, user){
        if (err) { return done(err); }
        if (user) { return done(null, false, {message: 'Email is already in use.'}); }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.firstname = req.body.firstname;
        newUser.lastname = req.body.lastname;
        newUser.address = req.body.address;
        newUser.address2 = req.body.address2;
        newUser.city = req.body.city;
        newUser.sex = req.body.sex;
        newUser.phone = req.body.phone;
        newUser.save(function(err, result){
            if(err){
                return done(err);
            }
            return done(null, newUser);
        });
      });
    }
  ));

passport.use('local.login',  new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},function(req, email, password, done){
  req.checkBody('email', 'Invailid email').notEmpty().isEmail();
  req.checkBody('password', 'Invailid password(>4)').notEmpty();
  var errors = req.validationErrors();
  if (errors){
    var messages = [];
    errors.forEach((error) =>{
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
    User.findOne({'email': email  }, function (err, user){
      if (err) { return done(err); }
      if ( !user) { return done(null, false, {message: 'No user found.'}); }
      if (!user.validPassword(password)){
        return done(null, false, {message: 'Wrong Password. '});
      }
          return done(null, user);
    });
  }
));