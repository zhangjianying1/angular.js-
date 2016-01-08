import module from './module';
class AjaxService {
    constructor($http, $q, $rootScope){
        this.$http = $http;
        this.$q = $q;
        this.$rootScope = $rootScope;
    }
    ajax(method, url, param){
        this.$rootScope.$broadcast('showloading');
        alert(333555)
        var deferred = this.$q.defer();
        this.$http[method](url, {params: param}).success((data) => {
            setTimeout(() => {
                deferred.resolve(data);
                this.$rootScope.$emit('hideloading');
            }, 2000);
        }).error(function(reason){
            deferred.reject(reason)
        });
        return deferred.promise;
    }
}
AjaxService.$inject = ['$http', '$q', '$rootScope']
export default module.service('AjaxService', AjaxService);
//export default module.service('AjaxService', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){
//    return {
//        ajax: function(method, url, param){
//            $rootScope.$broadcast('showloading');
//            var deferred = $q.defer();
//            $http[method](url, {params: param}).success(function(data){
//                setTimeout(function(){
//                    deferred.resolve(data);
//                    $rootScope.$emit('hideloading');
//                }, 2000);
//            }).error(function(reason){
//                deferred.reject(reason)
//            });
//            return deferred.promise;
//        }
//    }
//}])