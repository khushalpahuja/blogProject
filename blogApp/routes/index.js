var express = require("express");
var passport = require("passport")
var router = express.Router();
var Comment = require("../models/comment");
var User = require("../models/user");
var Blog = require("../models/blog");
var bcrypt = require("bcryptjs");
var JwtStrategy 			=          require('passport-jwt').Strategy;
var jwt                     = 			require('jsonwebtoken');
var ExtractJwt 				=          require('passport-jwt').ExtractJwt;

var comparePassword=function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    });
}

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
   var newUser=new User(req.body);
   var password=req.body.password;


        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err) throw err;
                newUser.password=hash;

                newUser.save((err,user)=>{
                    if(err)
                   return res.json({success:false,msg:"This username is already registered !"});
                    if(user){
                        console.log(user);
                        res.json({success:true,msg:"You are Registered"});
                        
                    }
                    
                });
            });
        });
});



router.post('/login',(req,res,next)=>{
	const username =req.body.username;
	const password =req.body.password;
    User.findOne({username:username},(err,user)=>{
		if(err) {
			res.json({success:false, msg:"Somthing went wrong"});
            throw err;
		}
		if(!user){
			return res.json({success:false, msg:"User not found !"});
        }
        comparePassword(password,user.password , (err, isMatch)=>{
		if(err) {
			res.json({success:false, msg:"Somthing went wrong"});
            throw err;
		}

		if(isMatch){
			const token=jwt.sign({data: user},'Hello world',{
				expiresIn:604800  // 1 Week
			});
			res.json({
				success:true,
				msg:"Successfully login",
				token:`Bearer ${token}`,
				user:{
					id        :   user._id,
					username  :   user.username,
					date      :   user.date,
					phone     :   user.phone,
					activated :   user.activated

				}
			});	
		}
		else{
			return res.json({success:false,msg:"Wrong password"});
		}
		});
	});

});

router.get("/logout" , function(req,res){
    req.logout();
    res.json("logout");
    
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