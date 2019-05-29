var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    email:      {type: String, required: true},
    password:   {type: String, required: true},
    firstname:  {type: String, required: true},
    lastname:   {type: String, required: true},
    address:    {type: String, required: true},
    address2:   {type: String, required: false},
    city:       {type: String, required: true},
    sex:        {type: String, required: true},
    phone:      {type: String, required: true}
}, {collection: 'User'});
userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', userSchema);