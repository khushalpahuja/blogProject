var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true
           },
    type : String , 
    isActive : {type : Boolean , default : false} ,
    phone : Number ,
    email : String ,
    dob : Date 
});




module.exports = mongoose.model("User" , UserSchema);