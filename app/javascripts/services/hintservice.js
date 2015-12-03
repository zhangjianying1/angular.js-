angular.module('app.hintservice', [])
.factory('HintService', function($http, $document, $rootScope, $compile){

    return {
        hint: function(param, url){
            $http.get(url || '../../app/views/modal/alert.html').then(function(data){
                var hint = angular.element(data.data);
                var mask = angular.element('<div id="mask"></div>');

                if ($document.find('#alert')){
                    $document.find('body').prepend(hint)
                    $document.find('body').prepend(mask)
                }

                var scope = angular.extend($rootScope.$new(),
                    param,
                    {confirm: function(){
                        hint.remove();
                        mask.remove();
                        param.hintFn()
                    }
                    });
                $compile(hint)(scope)
            })
        }
    }
})
.factory('DialogService', function($http, $rootScope, $document, $compile){
    var dialogMap = {};
    return {
        modal: function(param, data){
            var confirm = param.confirm;
            var html = '<div ng-controller="DialogCtrl"><p>' + confirm.tipsText + '</p><button ng-click="accept()">' + confirm.acceptText + '</button>' +
                '<button ng-click="cancel()">' + confirm.cancelText + '</button></div>'
            var confirm = angular.element(html);
            var mask = angular.element('<div id="mask"></div>');
            var newScope = $rootScope.$new();
            angular.extend(newScope, data);
            $document.find('body').append(confirm);
            $document.find('body').append(mask);
            $compile(confirm)(newScope);
            dialogMap[param.key] = param;

            dialogMap[param.key].confirm = confirm;
            dialogMap[param.key].mask = mask;

        },
        accept: function(key, result){
            this.dismiss(key);
            if (dialogMap[key].accept) {
                dialogMap[key].accept(result);
            }
        },
        dismiss: function(key){
            dialogMap[key].confirm.remove();
            dialogMap[key].mask.remove();
        }
    }
})
