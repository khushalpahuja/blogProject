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


router.post("/blogs",middleware.auth ,  middleware.isActivated ,middleware.isNotUser , function(req,res){
	var newBlog = req.body ;
	newBlog.author = {
		'id' : req.user._id , 
		'username' : req.user.username
	};
	console.log("dsjhsud",req.body);
	Blog.create(req.body , function(err,blog){
		if(err){
			console.log("ERROR!");
		}else{
			res.json({
				success:true,
				blog:blog
			});
		}
	});
});
var i=0;
router.get("/blogs/:id",middleware.auth ,  middleware.isActivated,function(req,res){
	Blog.findById(req.params.id , function(err , foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
				Comment.showObject(foundBlog.comments,(err,comment)=>{
				if(err) console.log('error here',err);
				else{
					res.json({foundBlog:foundBlog,comment:comment,success:true});
				}
				});
		}
	});
});



//UPDATE
router.put("/blogs/:id",middleware.auth ,middleware.checkBlogOwnership,  function(req,res){
	// req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id , req.body ,{new:true}  ,function(err,updatedBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			console.log('sdsdsd' + updatedBlog);
			res.json({
				updatedBlog:updatedBlog,
				success:true
			});
		}
	})
});
//delete
router.delete("/blogs/:id",middleware.auth , middleware.checkBlogOwnership,  function(req,res){
	Blog.findByIdAndRemove(req.params.id , function(err){
		if(err){
			res.json("error");
		}else{
			res.json("delete");
			// res.redirect("/blogs");
		}
	})
});

//likes
router.put("/blogs/:id/like" ,middleware.auth , function(req,res){
	Blog.find({"_id":req.params.id , "liked":req.user._id}, function(err,blog){
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
							res.json({blog:blog , success:true});
						}
					});
					
				//flash needed
				} else{
					//console.log("failed");
					res.json({blog:blog , success:false});
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