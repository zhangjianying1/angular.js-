angular.module('app.service', [])
.service('AjaxService', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){
    return {
        ajax: function(method, url, param){
            $rootScope.$broadcast('showloading');
            var deferred = $q.defer();
            $http[method](url, {params: param}).success(function(data){
                setTimeout(function(){
                    deferred.resolve(data);
                    $rootScope.$emit('hideloading');
                }, 2000);
            }).error(function(reason){
                deferred.reject(reason)
            });
            return deferred.promise;
        }
    }
}])
.service('LoadingService', ['$compile', '$document', '$rootScope', function($compile, $document, $rootScope){
    var load = angular.element('<div class="loading" style="position:absolute; top:0">加载中...</div>');

    return {
        showLoading: function(){
            $document.find('body').append(load);
            var scope = $rootScope.$new();
            $compile(load)(scope);
        },
        hideLoading: function(){
            load.remove();
        }

    }
}])
.service('UserMsg', function(){
    return {
        user: {}
    }
})
    // 退出登录
.service('LoginOut', ['UserMsg', 'AjaxService', function(UserMsg, AjaxService){
    return function(){

        AjaxService.ajax('get', '/package.json', {userCode: UserMsg.user.userCode}).then(function(data){
            UserMsg.user = {};
            console.log(UserMsg)
        })
    }
}])
.service('AjaxApiService', ['AjaxService', '$q', 'UserMsg', function(AjaxService, $q, UserMsg){
    return {
        ExchangeLottery: function(param){
            var deferred = $q.defer();
            AjaxService.ajax('get', '/package.json', param).then(function(data){
                data = {code: '0000'}
                if (data.code === '0000') {
                    deferred.resolve(data);
                } else {
                    deferred.reject();
                }

            })
            return deferred.promise;
        },
        // 查看兑换彩票
        ViewExchangeDetail: function(){
            return {
                loadNew: function(){
                    var deferred = $q.defer();
                    AjaxService.ajax('get', '/package.json').then(function(data){
                        data = {code: '0000', result: [{time: '2012', 'dirscription': '你好', 'count': '4'},{time: '2012', 'dirscription': '你好', 'count': '4'},{time: '2012', 'dirscription': '你好', 'count': '4'},{time: '2012', 'dirscription': '你好', 'count': '4'},{time: '2012', 'dirscription': '你好', 'count': '4'},{time: '2012', 'dirscription': '你好', 'count': '4'}]};

                        if (data.code === '0000') {
                            deferred.resolve(data.result);

                        } else {
                            defrred.reject();
                        }
                    })
                    return deferred.promise;
                },
                loadOld: function(){
                    var deferred = $q.defer();
                    AjaxService.ajax('get', '/package.json').then(function(data){
                        data = {code: '0000', result: [{time: '2012', 'dirscription': '你好', 'count': '4'},{time: '2012', 'dirscription': '你好', 'count': '4'},{time: '2012', 'dirscription': '你好', 'count': '4'},{time: '2012', 'dirscription': '你好', 'count': '4'},{time: '2012', 'dirscription': '你好', 'count': '4'},{time: '2012', 'dirscription': '你好', 'count': '4'}]};

                        if (data.code === '0000') {
                            deferred.resolve(data.result);

                        } else {
                            defrred.reject();
                        }
                    })
                    return deferred.promise;
                }
            }

        },
        // 个人资料
        UserArchives: function(){

            var deferred = $q.defer();
            AjaxService.ajax('get', '/package.json').then(function(data){
                UserMsg.user = data = {code: '0000', userName: '彩米', realName: '张小龙', mobile: '13133450954', cardCode: '123456777777',  cashAmount: '80.00', presentAmount: '80.00', drawAmount: '80.00'};
                if (data.code === '0000') {
                    deferred.resolve(data);
                }
            }, function(reason){
                deferred.reject(reason);
            })
            return deferred.promise;

        },
        // 绑定手机号
        BindMobile: function(param){
            var deferred = $q.defer();
            AjaxService.ajax('get', '/package.json', param).then(function(data){
                data = {code: '0000'};
                if (data.code === '0000') {
                    deferred.resolve(data);
                }

            })
            return deferred.promise;
        },
        // 绑定实名
        BindRealName: function(param){
            var deferred = $q.defer();
            AjaxService.ajax('get', '/package.json', param).then(function(data){
                data = {code: '0000'};
                if (data.code === '0000') {
                    deferred.resolve(data);
                }
            })
            return deferred.promise;
        }
    }
}])

