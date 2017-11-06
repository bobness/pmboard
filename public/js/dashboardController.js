angular.module('pmboard').controller('dashboardController', [
    '$scope', '$http', '$cookies', '$uibModal', 'userService', 'productService', 'oauthService',
    function($scope, $http, $cookies, $uibModal, userService, productService, oauthService) {
  
  var debugUserId = '55271181777f411b3a90a2a5';
  
  $scope.products = [];
  $scope.user = null;
  $scope.currentProduct = null;
  
  $scope.changeProduct = function(index) {
    userService.changeCurrentProduct($scope.user._id, index).then(function() {
      $scope.currentProduct = $scope.products[index];
      $scope.user.currentProduct = index;
      //$scope.userWidget.refresh();
      //$scope.productWidget.refresh();
    });
  };
  
  $scope.createProduct = function() {
    return productService.createProduct().then(function(product) {
      $scope.products.push(product);
      return userService.addProductAccess($scope.user._id, product._id).then(function() {
        $scope.changeProduct($scope.products.length-1);
      });
    });
  };
  
  $scope.updateProduct = function(product) {
    return productService.updateProduct(product);
  };
  
  $scope.deleteProduct = function(id) {
    var index = $scope.products.map(function(p) { return p._id; }).indexOf(id);
    return productService.deleteProduct(id).then(function() {
      $scope.products = $scope.products.filter(function(p) { return p._id !== id; });
      var newIndex = index;
      if (newIndex === $scope.products.length) {
        newIndex = newIndex - 1 >= 0 ? newIndex - 1 : 0;
      }
      return $scope.changeProduct(newIndex);
    });
  };
  
  // initialize the page
  
  OAuth.initialize('N5J17iZMUHN_P1M48zvwBu-YQP4'); // TODO: hide this key somewhere via an ajax call?
  
  $scope.loading = true;
  var init = function(user) {
    $scope.user = user;
    $scope.products = user.products;
    $scope.currentProduct = user.products[$scope.user.currentProduct];
    //$scope.userWidget.refresh();
    //$scope.productWidget.refresh();
    $scope.loading = false;
  };
  // TODO: get this working without forcing another auth - saved identity token on server???
  var service = 'google';
  var cookieName = 'oauth:' + service;
  if ($cookies.get('userid') && $cookies.get(cookieName)/* && getCookie('XSRF-TOKEN')*/) {
    var userId = $cookies.get('userid');
    userService.getUser(userId).then(function(user) {
      init(user);
    });
  } else {
    oauthService.doAuthentication(service).then(function(data) {
      $cookies.put(cookieName, data.oauth);
      $cookies.put('userid', data.user._id);
      init(data.user);
    }).catch(function(err) {
      console.error(err);
    });
  }
}]);