var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var LocalStrategy = require("passport-local");
var passport = require("passport");
var Comment = require("./models/comment");
var User = require("./models/user");
var Blog = require("./models/blog");
var middleware = require("./middleware/index");
var cors = require("cors");
// var Blog = require("./models/blog");

//APP CONFIG
// mongoose.connect("mongodb://localhost/blog_app");
mongoose.connect("mongodb://khushal:khushal@ds229465.mlab.com:29465/blog_app1");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public")); //to use custom style sheet
app.use(methodOverride("_method")); //for overriding methods (put and delete)
app.use(expressSanitizer()); //for preventing user to input script tag in textarea
app.use(bodyParser.json());
// app.use(cors({ credentials:true ,origin:'http://localhost:4200' }));
app.use(cors());

app.use(require("express-session")({
	secret : "nothing remains hidden for long" , 
	resave : false , 
	saveUninitialized : false
}));
  
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));//local startegy is required using passport local
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
  //above 3 statements come from user.js from plugin passport local mongoose
  

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