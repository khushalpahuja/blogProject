var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var Comment = require("./models/comment");
var User = require("./models/user");
var Blog = require("./models/blog");
var middleware = require("./middleware/index");
var cors = require("cors");
var JwtStrategy 			=          require('passport-jwt').Strategy;
var jwt                     = 			require('jsonwebtoken');
var ExtractJwt 				=          require('passport-jwt').ExtractJwt;

// var Blog = require("./models/blog");

//APP CONFIG
// mongoose.connect("mongodb://localhost/blog_app");
mongoose.connect("mongodb://khushal:khushal@ds229465.mlab.com:29465/blog_app1");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(cors({ credentials:true ,origin:'http://localhost:4200' }));
app.use(cors());
app.use(passport.initialize());

app.use(passport.session());

require('./passport')(passport);



// Blog.create({
// 	title : "Test Blog" , 
// 	image : "https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg",
// 	body : "HELLO THIS IS A BLOG POST"
// });
// RESTFUL ROUTES
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});


var commentRoute = require("./routes/comments");
app.use(commentRoute);

var blogRoute = require("./routes/blogs");
app.use(blogRoute);

var indexRoute = require("./routes/index");
app.use(indexRoute);

var adminRoute = require("./routes/admin");
app.use(adminRoute);

app.listen(process.env.PORT || 8000,function(){
	console.log("Blog app server has started");
});