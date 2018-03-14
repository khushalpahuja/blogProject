var Blog = require("../models/blog");
var Comment = require("../models/comment");
var User = require("../models/user");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }   
    res.redirect("/login");
}

middlewareObj.isActivated = function(req,res,next){
    if(req.isAuthenticated() && (req.user.isActive || req.user.type === "admin")){
        return next();
    }
    res.redirect("/blogs");
}

middlewareObj.isAdmin = function(req,res,next){
    if(req.isAuthenticated() && req.user.type === "admin"){
        return next();
    }
    res.redirect("/blogs");
}

middlewareObj.isNotUser = function(req,res,next){
    if(req.isAuthenticated() && req.user.type !== "user"){
        return next();
    }   
    res.redirect("/blogs");
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.type === "admin"){
            console.log("2");
            next();
        } else{
            Comment.findById(req.params.comment_id , function(err,comment){
                console.log("3");
                if(err){
                    console.log(err);
                } else{
                    if(comment.author.id.equals(req.user._id)){
                        next();
                    } else{
                        res.redirect("/blogs/" + req.params.id);
                    }
                }
            });
        }
    } else {
        res.redirect("/login");
    }
};

middlewareObj.checkBlogOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.type === "admin"){
            console.log("2");
            next();
        } else{
            Blog.findById(req.params.id , function(err,blog){
                console.log("3");
                if(err){
                    res.redirect("/");
                } else{
                    // console.log(blog);
                    // console.log(req.params.id);
                    if(blog.author.id.equals(req.user._id)){
                        next();
                    } else{
                        res.redirect("/blogs");
                    }
                }
            });
        }     
    } else{
        res.redirect("/login");
    }
};

middlewareObj.checkpayment=function(req,res,next){
   	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			console.log(err);
		} else{
            if(req.user.type === "admin" || foundBlog.author.id.equals(req.user._id)){
                return next();
            }
   	       	if(foundBlog.likecount>=10){
   	       		Blog.find({"_id":req.params.id, "payee":(req.user._id).toString()},function(err,data){
					if(err){
						console.log(err);
					}else {            
				        if(data.length>0){       		             	 
						   next();
			            }else{					   	  		             	
			               res.redirect("/payments/"+req.params.id);
	 		             }
				    }
	            });
   	        } else{
		        next();
	        }
	    }
	});
}	

module.exports = middlewareObj;