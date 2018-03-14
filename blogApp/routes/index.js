var express = require("express");
var passport = require("passport")
var router = express.Router();
var Comment = require("../models/comment");
var User = require("../models/user");
var Blog = require("../models/blog");

// home route
router.get("/" , function(req,res){
    var newUser = new User({username : "admin" , type : "admin" , isActive : true});
    User.register(newUser , "admin" , function(err,user){
	if(err){
		console.log(err);   
	}
	passport.authenticate("local")(req , res , function(){
		res.redirect("/blogs");
	}); 
});
    res.render("landing");
});

//authentication
router.get("/register", function(req,res){
    res.render("register");
});

router.post("/register" , function(req,res){
   // console.log(req.body.username);
    var newUser = new User({
        username : req.body.username , 
        type:req.body.access ,
        dob:req.body.dob, 
        phone:req.body.phone ,
        email:req.body.email
    });
    User.register(newUser , req.body.password , function(err,user){
        if(err){
            console.log(err);   
        }
        passport.authenticate("local")(req , res , function(){
            res.redirect("/blogs");
        }); 
    });
});

router.get("/login" , function(req,res){
    res.render("login");
});

router.post("/login" , passport.authenticate("local" , 
    {
        successRedirect : "/blogs" , 
        failureRedirect : "/login"

    }) , function(req,res){
});

router.get("/logout" , function(req,res){
    req.logout();
    res.redirect("/blogs");
  });

router.delete("/user/:id" , function(req,res){
    User.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/admin");
        }
    })
})

//dashboard
router.get("/user/:id/dashboard" , function(req,res){
    User.findById(req.params.id , function(err,user){
        if(err){
            console.log(err);
        } else{
            res.render("dashboard",{user:user});
        }
    });
});

module.exports = router;