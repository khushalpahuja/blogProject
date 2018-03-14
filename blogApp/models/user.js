var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username : String , 
    password : String ,
    type : String , 
    isActive : {type : Boolean , default : false} ,
    phone : Number ,
    email : String ,
    dob : Date 
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User" , UserSchema);