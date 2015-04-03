var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
//var cors = require('cors');
var mongoose = require('mongoose');
//var routes = require('./routes/index');
var products = require('./routes/products');
var oauth_route = require('./routes/oauth');
var oauth = require('oauthio');

var app = express();

app.use(express.static('public'));
//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
}));
app.use(csrf());
app.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.locals.csrftoken = req.csrfToken();
  next();
});

/* Initialize and route oauth if necessary */
try {
  var config = require('./config');
  oauth.initialize(config.key, config.secret);
} catch (e) {
  console.log(e);
}
app.use('/oauth', oauth_route);

// TODO: fix cookie-based auth at some point, but use this (VERY INSECURE ROUTE) for now
app.use('/user/:user_email', function(req, res, next) {
  var db = mongoose.createConnection("mongodb://localhost/users");
  var schema = require('./schema/User.js');
  var User = db.model('User', schema);
  var email = req.params.user_email
  
  User.findOne({email: email}, function(err, user) {
    res.json(user);
  });
});

/* Initialize MongoDB & Express route for product requests */
var proddb = mongoose.createConnection("mongodb://localhost/products");
var productSchema = require('./schema/Product.js');
var Product = proddb.model('Product', productSchema);
app.set('Product', Product);
app.use('/products', products);

/* Error Handlers */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;