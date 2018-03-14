var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
var User = require("../models/user");
var Blog = require("../models/blog");
var middleware = require("../middleware/index");

router.get("/admin", middleware.isAdmin , function(req,res){
    User.find({ username: { $ne: "admin" } }, function(err,users){
        if(err){
            console.log(err);
        } else{
            res.render("admin" ,{users : users});
        }
    })
});

// router.put("/admin" , function(req,res){
//     var public = req.body.public;
//     console.log("*********************************");
//     console.log(public);
//     console.log("*********************************");
//    User.find({},function(err,users){
//         if(err){
//             console.log(err);
//         } else{
//             users.forEach(function(user){
//                 user.isActive = false;
//                 user.save();
//             });
//             console.log( users);
//         }
//     });    

//     public.forEach(function(user_id){
//         User.findByIdAndUpdate({_id: user_id} , {isActive :true} ,{new: true}, function(err ,UpdateUser){
//             // console.log(UpdateUser);
//             if(err){
//                 console.log(err);
//             } else{
//                 console.log('gjhkl',UpdateUser);
//             }
//         } )
//     });
//             res.redirect("/admin");
//             User.find({_id: public} , function(err , users){
//                 users.forEach(function(user){
//                     console.log(user.username);
//                     if(!user.isActive){
//                         user.isActive = true;
//                         user.save();
//                     }
//                     console.log("*********************************");
//                     console.log("user:",user);
//                     console.log("*********************************");
//                 }); 
//                 res.redirect("/admin");
//             });
    
    
// })
router.put("/admin/:id" , middleware.isAdmin , function(req,res){
    User.findById(req.params.id , function(err,user){
        if(err){
            console.log(err);
        } else{
            user.isActive = !(user.isActive);
            user.save();
            res.redirect("/admin");
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