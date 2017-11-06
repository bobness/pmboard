angular.module('pmboard').factory('oauthService', ['$http', '$q', 'userService', function($http, $q, userService) {
  var service = {};
  
  service.doAuthentication = function(serviceName) {
    return retrieve_token().then(function(res) {
      var token = res.data.token;
      return authenticate(token, serviceName);
    });
  }
  
  function retrieve_token() {
    return $http.get('/oauth/token');
  }
  
  function authenticate(token, serviceName) {
  	return $q(function(resolve, reject) { // needed bc of OAuth's non-angular promises
    	OAuth.popup(serviceName, {
    		state: token,
    		// Google requires the following field
    		// to get a refresh token
    		//authorize: {
    		//  approval_prompt: 'force'
    		//}
    	}).done(function(res) {
    		$http.post('/oauth/signin', {code: res.code, service: serviceName}).then(function(res) {
      		resolve(res.data);
    		}).catch(function(res) {
      		reject(res.data);
    		});
  		}).fail(function(err) {
  			reject(err);
		  });
  	});
  }
  
  return service;
}]);
