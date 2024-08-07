var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
// var cookieParser = require("cookie-parser");
// var csurf = require("csurf");
//var cors = require('cors');
var mongoose = require("mongoose");

//var routes = require('./routes/index');
var products = require("./routes/products");
var auth_route = require("./routes/auth");
var oauth_route = require("./routes/oauth");

var app = express();

var db = mongoose.createConnection("mongodb://localhost/pmboard");
var userSchema = require("./schema/User.js");
var User = db.model("User", userSchema);
app.set("User", User);
var productSchema = require("./schema/Product.js");
var Product = db.model("Product", productSchema);
app.set("Product", Product);

app.use(express.static("public/dist"));
//app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
  })
);
// app.use(csurf());
// app.use(function (req, res, next) {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   res.locals.csrftoken = req.csrfToken();
//   next();
// });

app.use("/auth", auth_route);
app.use("/oauth", oauth_route);
app.use("/users", require("./routes/users"));
app.use("/products", products);

/* Error Handlers */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
app.use(function (err, req, res, next) {
  // console.log("*** caught error from req: ", req);
  return res.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
});
// }

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Listening on ", port);
});

// production error handler
// no stacktraces leaked to user
/*
app.use(function(err, req, res, next) {
  return res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});
*/

module.exports = app;
