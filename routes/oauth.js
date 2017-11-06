var express = require('express');
var router = express.Router();
var oauth = require('oauthio');
var mongoose = require('mongoose');

/* Initialize and route oauth if necessary */
try {
  var config = require('../config');
  oauth.initialize(config.key, config.secret);
} catch (e) {
  console.log(e);
}

var User;
router.use(function(req, res, next) {
  User = req.app.get('User');
  next();
});

router.get('/token', function(req, res, next) {
	var token = oauth.generateStateToken(req.session);

	res.json({
		token: token
	});
});

router.post('/signin', function(req, res, next) {
	var code = req.body.code;
	var service = req.body.service;
	var auth;
	
	oauth.auth(service, req.session, {
		code: code
	})
	.then(function (request_object) {
		auth = request_object;
		return request_object.me();
	})
	.then(function(guser) {
  	if (guser && guser.raw && guser.raw.error) {
    	var err = new Error(guser.raw.error.message);
      err.status = guser.raw.error.code;
      return next(err);
  	}
  	User.findOne({'email': guser.email})
  	  .populate('products', 'name')
  	  .exec(function(err, user) {
        if (user) {
            req.session.email = user.email;
            // TODO: write auth to database
            var ret = {
                success: true,
                user: user,
                oauth: JSON.stringify(auth)
            };
            return res.json(ret);
        } else {
          return next(err);
        }

    	});
	})
	.fail(function (e) {
		return next(e);
	});
});

module.exports = router;