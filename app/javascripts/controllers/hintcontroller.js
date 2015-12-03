angular.module('app.hintcontroller', [])
.controller('DialogCtrl', ['$scope', 'DialogService', function($scope, DialogService){
        $scope.accept = function(){
            DialogService.accept('ng.confirm');
        }
        $scope.cancel = function(){
            DialogService.dismiss('ng.confirm');
        }
        $scope.close = function(){
            DialogService.dismiss('ng.confirm');
        }
    }])