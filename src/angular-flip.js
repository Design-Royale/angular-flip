'use strict';

angular.module('drFlip', [])
  .directive('drFlip', function() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        drFlipped: '=?'
      },
      template:
        '<div class="flip">' +
          '<div class="card" ng-transclude></div>' +
        '</div>',
      controller: ['$scope', '$element', function($scope, $element) {
        this.toggle = function() {
          var flipped = !$element.hasClass('flipped');
          $scope.$apply(function() {
            $scope.drFlipped = flipped;
          });
        };

        this.drFlipFront = function() {
          $scope.drFlipped = false;
        };

        this.drFlipBack = function() {
          $scope.drFlipped = true;
        };
      }],
      link: function(scope, elm, attrs) {
        scope.$watch('drFlipped', function(newValue, oldValue) {
          if (newValue) {
            elm.addClass('flipped');
          } else {
            elm.removeClass('flipped');
          }
        });
      }
    };
  })
  .directive('drFlipFront', function() {
    return {
      require: '^drFlip',
      restrict: 'E',
      replace: true,
      transclude: true,
      template:
        '<div class="face front" ng-transclude></div>'
    };
  })
  .directive('drFlipBack', function() {
    return {
      require: '^drFlip',
      restrict: 'E',
      replace: true,
      transclude: true,
      template:
       '<div class="face back" ng-transclude></div>'
    };
  })
  .directive('drFlipToggle', function() {
    return {
      require: '^drFlip',
      restrict: 'A',
      link: function(scope, elm, attrs, controller) {
        var previousValue;

        attrs.$observe('drFlipToggle', function(value) {
          if (!value) {
            value = 'click';
          }

          if (previousValue) {
            elm.off(previousValue, controller.toggle);
          }

          previousValue = value;

          elm.on(value, controller.toggle);
        });
      }
    };
  });
