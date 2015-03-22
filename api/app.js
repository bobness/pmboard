var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
//var routes = require('./routes/index');
var products = require('./routes/products');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/user/login',  function(req, res, next) {
  // TODO: convert to mongojs - not really using the document model for anything
  // OR: create a larger User model and express route (get user, add user, list users [by search], etc)
  var db = mongoose.createConnection("mongodb://localhost/users");
  var userSchema = new mongoose.Schema({
    "oauth": {
      "oauth_token": String,
      "oauth_token_secret": String,
      "provider": String
    },
    "products": Array
  });
  var User = db.model('User', userSchema);
  var oauth_token = req.body.oauth_token;
  var oauth_token_secret = req.body.oauth_token_secret;
  var provider = req.body.provider;
  var search = {
    oauth: {
      oauth_token: oauth_token,
      oauth_token_secret: oauth_token_secret,
      provider: provider
    }
  };
  console.log("search: ", search);
  User.findOne(search, function(err, user) {
    console.log("user: ", user);
    if (err) {
      next(err);
    }
  	if (user) {
      res.json({
        success: true,
        user: user
      });
    } else {
      res.json({
        success: false,
        msg: "No such user"
      });
    }
  });
});

var proddb = mongoose.createConnection("mongodb://localhost/products");
var productSchema = new mongoose.Schema({
  name: String,
  personas: Array
});
var Product = proddb.model('Product', productSchema);
app.set('Product', Product);

//app.use('/', routes);
// TODO: add an account route
// but also just a header/cookie parser to limit requests to the current logged-in user
app.use('/products', products);

// error handlers

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
