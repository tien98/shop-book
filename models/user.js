var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
});
module.exports = mongoose.model('User', userSchema);