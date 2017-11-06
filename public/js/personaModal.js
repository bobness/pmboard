angular.module('pmboard').directive('personaModal', [
  '$http', '$uibModal', '$cookies', '$compile', 'productService', 'oauthService', 
  function($http, $uibModal, $cookies, $compile, productService, oauthService) {
  
  return {
    templateUrl: '../templates/personaModal.html',
    scope: {
      productId: '@',
      persona: '='
    },
    controller: ['$scope', function($scope) {
      
      var self = this;
      
      self.trends = {};
      
      self.updateTrendList = function() {
        $scope.trendsShown = {};
        self.trends = {};
        $scope.persona.evidence.forEach(function(evidence) {
          if (!evidence.trends) {
            evidence.trends = [];
          }
          evidence.trends.forEach(function(trend) {
            if (!(trend.name in self.trends)) {
              self.trends[trend.name] = angular.extend({
                count: 0
              }, trend);
            }
            self.trends[trend.name].count++;
            trend.class = $scope.trendTypes[trend.type] || 'label-info';
          });
        });
      
        $scope.trendList = Object.keys(self.trends)
          .map(function(name) {return self.trends[name]; })
          .sort(function(a, b) {
            if (a.type === b.type) {
              return a.count - b.count; 
            } else {
              var types = Object.keys($scope.trendTypes); 
              return types.indexOf(a.type) - types.indexOf(b.type);
            }
          });
      };
      
      $scope.$watch('persona', function() {
        self.updateTrendList();
      });
      
      $scope.trendTypes = {
        "Objective" : "label-danger",
        "Goal" : "label-warning",
        "Activity" : "label-primary",
        "Task" : "label-default",
        "Resource" : "label-success",
        "None": "label-info"
      };
      
      $scope.trendsShown = {};
      
      $scope.onUpdateName = function(personaIndex, name) {
        return productService.updatePersona($scope.productId, personaIndex, name);
      };
      
      $scope.showTrendType = function(trend) {
        if (!(trend.type in $scope.trendsShown)) {
          $scope.trendsShown[trend.type] = trend.name;
          return trend.type;
        } else if ($scope.trendsShown[trend.type] === trend.name) {
          return trend.type;
        } else {
          return '';
        }
      };
      
      $scope.findTrend = function(persona, query) {
        var found = Object.keys(self.trends)
          .filter(function(name) { return name.toLowerCase().indexOf(query.toLowerCase()) > -1; })
          .map(function(name) { return {name: name, class: 'label-info'}; });
        return found;
      };
      
      $scope.openFilesModal = function(persona) {
        var evidence = persona.evidence;
        var modal = $uibModal.open({
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'templates/addFilesModal.html',
          scope: $scope,
          controller: ['$uibModalInstance', function($uibModalInstance) {
            $scope.files = [];
            $scope.cancel = function() {
              $uibModalInstance.dismiss();
            };
            $scope.addFile = function(file) {
              if (file.selected) {
                var newFile = {
                  name: file.title,
                  url: file.alternateLink,
                  icon: file.iconLink
                };
                productService.addEvidenceToPersona($scope.productId, persona.index, newFile).then(function() {
                  persona.evidence.push(newFile);
                  $scope.files = $scope.files.filter(function(f) { return f.alternateLink !== file.alternateLink; });
                });
              }
            }
          }]
        });
        var reauth = function(serviceName) {
          return oauthService.doAuthentication(serviceName).then(function(data) {
            return $cookies.put('oauth:' + serviceName, data.oauth);
          }).catch(function(err) {
            throw new Error(err.message);
          });
        };
        var getDriveFiles = function() {
          $scope.loading = true;
          var serviceName = 'google_drive';
          var cookie = $cookies.get('oauth' + serviceName);
          if (cookie) {
            var oauth = JSON.parse(cookie);
            var accessToken = oauth.access_token;
            return $http.get('https://www.googleapis.com/drive/v2/files', {headers: {Authorization: 'Bearer ' + accessToken}})
              .then(function(res) {
                $scope.files = res.data.items.filter(function(file) {
                  return evidence.map(function(f) { return f.url; }).indexOf(file.alternateLink) === -1;
                });
              })
              .catch(function(res) {
                if (res.status === 401) {
                  reauth(serivceName).then(getDriveFiles);
                }
              })
              .finally(function() {
                $scope.loading = false;
              });
          } else {
            reauth(serviceName).then(getDriveFiles);
          }
          
        };
        modal.rendered.then(getDriveFiles);
      };
      
      $scope.removeFile = function(persona, fileIx) {
        return productService.removeEvidenceFromPersona($scope.productId, persona.index, fileIx).then(function() {
          persona.evidence.splice(fileIx, 1);
        });
      };
      
      $scope.addTrend = function(persona, fileIx, trend) {
        return productService.addPersonaTrend($scope.productId, persona.index, fileIx, {
          name: trend.name,
          type: ''
        });
      };
      
      $scope.removeTrend = function(persona, fileIx, trend) {
        var trendIx = persona.evidence[fileIx].trends.map(function(trend) { return trend.name; }).indexOf(trend.name);
        return productService.removePersonaTrend($scope.productId, persona.index, fileIx, trendIx).then(function() {
          var trends = $scope.persona.evidence[fileIx].trends;
          self.updateTrendList();
        });
      };
      
      $scope.hasType = function(trend) {
        return !!trend.type;
      };
      
    }],
    link: function(scope, elem, attrs, ctrl) {
      
      var $typeChangePopup;
      var popupData = {};
      
      scope.changeTrendType = function(newType) {
        var popupTrend = popupData.trend;
        if (popupTrend) {
          popupTrend.class = scope.trendTypes[newType]
          if (newType === 'None') {
            newType = undefined;
          }
          popupTrend.type = newType;
          productService.changeTrendType(scope.productId, scope.persona.index, popupData.evidenceIndex, popupData.trendIndex, popupTrend).then(function() {
            if ($typeChangePopup) {
              $typeChangePopup.remove();
            }
            ctrl.updateTrendList();
          });
        }
      };
      
      scope.handleTrendClick = function(evidenceIndex, event, trend) {
        event.stopPropagation(); // TODO: only do these if shift/meta?
        event.preventDefault();
        if (event.shiftKey) {
          var $tmpl = angular.element('#trend-type-popover-template').html();
          var $target = angular.element(event.currentTarget);
          var $parent = $target.offsetParent();
          $typeChangePopup = $compile($tmpl)(scope);
          $typeChangePopup.css('top', $target.position().top + $target.height());
          $typeChangePopup.css('left', $target.position().left /*+ ($target.width() / 2)*/);
          $parent.append($typeChangePopup);
          popupData = {
            evidenceIndex: evidenceIndex,
            trend: trend,
            trendIndex: $target.index()
          };
        } 
      };
      
    }
  };
  
}]);