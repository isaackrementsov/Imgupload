//Importing modules
var LocalStrategy = require('passport-local').Strategy;
var flash = require("connect-flash");
var passport = require("passport");
var session = require("express-session");
var helmet = require("helmet");
var expressValidator = require("express-validator");
var mongoose = require("mongoose");
var path = require("path");
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var routes = require('./server/routes');
var rateLimiter = require("express-rate-limit");
app.use(helmet({
  frameguard: {action: "deny"}
}));
app.set('port', process.env.PORT || 3000); //Better to set in separate function
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
mongoose.connect("mongodb://127.0.0.1:27017/users"); //Starting mongoDB
app.listen(app.get('port'), function(){
  console.log("server started");
});
var db = mongoose.connection;
app.use(session({
  secret: 'yVVma9ga',
  saveUninitialized: true,
  resave: true,
  cookie: {httpOnly: true}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(flash());
app.use(function(req,res,next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash("error");
  next();
});
var limiter = new rateLimiter({
  windowMs: 5*60*1000,
  max: 100,
  delayMs: 1
});
app.use(limiter);
routes(app); //Better to create separate routes file for more cleanliness
