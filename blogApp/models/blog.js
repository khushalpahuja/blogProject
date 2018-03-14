var mongoose = require("mongoose");
var Comment = require("./comment");

var blogSchema = new mongoose.Schema({
	title : String , 
	image : String , 
    body : String , 
    likecount : {type : Number , default : 0} ,
    payee : [{type:String}],
    liked : [
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref : "User"
        }
    ] ,
    created : {type : Date , default : Date.now} , 
    author : {
            id :{
                type: mongoose.Schema.Types.ObjectId ,
                ref : "User"
            },
            username : String
    },  
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "Comment"
        }
    ] 
});
module.exports = mongoose.model("Blog" , blogSchema);