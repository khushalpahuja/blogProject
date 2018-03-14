var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var Comment = require("../models/comment");
var middleware =require("../middleware/index");

router.get("/blogs",function(req,res){
	// console.log("reqquser",req.user);
	Blog.find({},function(err,blogs){
		if(err){
			console.log("ERROR!");
		} else{
			res.json(blogs);
		}
	});
});

router.get("/blogs/new", middleware.isActivated , middleware.isNotUser , function(req,res){
	res.render("blogs/new");
})

router.post("/blogs", function(req,res){
	var newBlog = req.body.blog ;
	// newBlog.author = {
	// 	id : req.user._id , 
	// 	username : req.user.username
	// };
	console.log("dsjhsud",req.body);
	Blog.create(req.body , function(err,blog){
		if(err){
			console.log("ERROR!");
		}else{
			res.json(blog);
		}
	});
});
var i=0;
router.get("/blogs/:id",middleware.isLoggedIn , middleware.isActivated , middleware.checkpayment,function(req,res){
	Blog.findById(req.params.id , function(err , foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			let arr = [];
	
				Comment.showObject(foundBlog.comments,(err,comment)=>{
				if(err) console.log('error here',err);
				else{
					//console.log('comment in route',comment);
					res.render("blogs/show",{ blog : foundBlog , arr:comment});
			    
				}
				});
						
		
			//console.log('ndjnfjnfdvjlnfjvnjn',arr);
			//res.render("blogs/show",{ blog : foundBlog , arr:arr});
		}
	});
});

//EDIT
router.get("/blogs/:id/edit",middleware.checkBlogOwnership, function(req,res){
	Blog.findById(req.params.id , function(err , foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("blogs/edit",{ blog : foundBlog});
		}
	})
});

//UPDATE
router.put("/blogs/:id",middleware.checkBlogOwnership, function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id , req.body.blog , function(err,updatedBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/" + req.params.id);
		}
	})
});
//delete
router.delete("/blogs/:id", middleware.checkBlogOwnership, function(req,res){
	Blog.findByIdAndRemove(req.params.id , function(err){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs");
		}
	})
});

//likes
router.put("/blogs/:id/like" ,middleware.isLoggedIn , function(req,res){
	Blog.find({"_id":req.params.id, "liked":req.user._id}, function(err,blog){
		//console.log("blog:",blog);
		if(err){
			console.log(err);
		} else{
				//console.log(blog.liked);
				if(blog.length === 0){
					Blog.findById(req.params.id , function(err , blog){
						if(err){
							console.log(err);
						} else{
							blog.likecount ++;
							blog.liked.push(req.user._id);
							blog.save();
							//console.log("success");
							res.redirect("/blogs/"+req.params.id);
						}
					});
					
				//flash needed
				} else{
					//console.log("failed");
					res.redirect("/blogs/"+req.params.id);
				}
		}
	});
});

//payment
router.get("/payments/:id",function(req,res){
	   res.render("payment",{blog_id: req.params.id});
   });	

router.post("/payments/:id",function(req,res){
       Blog.findById(req.params.id,function(err,foundBlog){
       		if(err){
				console.log(err);
			}else{
       			foundBlog.payee.push((req.user._id).toString());
       			foundBlog.save();
       			res.redirect("/blogs/"+req.params.id);
       		}
       	});

});

module.exports = router;