var mongoose = require("mongoose");
var User = require("./user");

var commentSchema = new mongoose.Schema({
    text : String 
    // author : {
    //         id :{
    //             type: mongoose.Schema.Types.ObjectId ,
    //             ref : "User"
    //         },
    //         username : String
    // }
});

var Comment = module.exports = mongoose.model("Comment" , commentSchema);
var arr=[];
module.exports.showObject= function(comment,callback){
    Comment.find({_id:comment})
    .then(function(comments){
        //arr.push(comment);
         callback(null,comments);
    })
    .catch(function(err){
        callback(err);
    });
   // console.log('array in model',arr);
    //return arr;
};