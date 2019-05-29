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