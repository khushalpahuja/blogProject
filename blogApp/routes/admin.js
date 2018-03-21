var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
var User = require("../models/user");
var Blog = require("../models/blog");
var middleware = require("../middleware/index");

router.get("/admin",middleware.auth , middleware.isAdmin , function(req,res){
    User.find({ username: { $ne: "admin" } }, function(err,users){
        if(err){
            console.log(err);
        } else{
            console.log(users);
            res.json(users);
        }
    })
});

router.put("/admin/:id" ,middleware.auth , middleware.isAdmin , function(req,res){
    User.findById(req.params.id , function(err,user){
        if(err){
            console.log(err);
        } else{
            user.isActive = !(user.isActive);
            user.save();
            res.json(user);
        }
    })
})

module.exports = router;

// setFalse = function(users , callback){
//     User.find({})
//     .then(function(users){

//         callback(null,users);
//     })
//     .catch(function(err){
//         callback(err);
//     });
// };