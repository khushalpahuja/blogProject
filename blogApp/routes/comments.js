var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
var Blog = require("../models/blog");
var middleware = require("../middleware/index");
var i=0;
//new comment page
router.get("/blogs/:id/comments/new" ,  function(req,res){
    Blog.findById(req.params.id , function(err , blog){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new.ejs",{blog : blog});
        }
    })
});

//logic new comment
router.post("/blogs/:id/comments" , function(req,res){
    Blog.findById(req.params.id , function(err , blog){
        if(err){
            console.log(err);
        } else{
            console.log(req.body);
            var newComment = req.body;
            // newComment.author = {
            //     id : req.user._id , 
            //     username : req.user.username
            // };
            Comment.create(newComment , function(err,comment){
                if(err){
                    console.log(err);
                } else{
                    comment.save();
                    blog.comments.push(comment._id);
                    blog.save();
                    res.json(comment);
                    // console.log("*****************");
                    // console.log(blog) ;
	                // console.log("*****************"); 
                    // res.redirect("/blogs/" + req.params.id);
                }
            });
            // console.log('Blog: ', blog);
        }
    });
});

//edit
router.get("/blogs/:id/comments/:comment_id/edit" ,middleware.checkCommentOwnership , function(req,res){
    var blogId = req.params.id;
    Comment.findById(req.params.comment_id , function(err,comment){
        if(err){
            console.log(err);
        } else{
            res.render("comments/edit" , {comment:comment, blogId:blogId});
        }
    });
});
//update
router.put("/blogs/:id/comments/:comment_id" ,function(req,res){
    console.log("edit comment backend");
    Comment.findByIdAndUpdate(req.params.comment_id , req.body ,{new:true} , function(err , comment){
        if(err){
            console.log(err);
        } else{
           res.json(comment);
        }
    });
});
//delete
router.delete("/blogs/:id/comments/:comment_id" , function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id , function(err){
        if(err){
            console.log(err);
        } else{
            // res.redirect("/blogs/" + req.params.id);
            res.json("1");
        }
    })
});

module.exports = router;