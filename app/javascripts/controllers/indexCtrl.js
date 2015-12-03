var ctrl = angular.module('indexCtrl', []);

/**
 * 兑换彩票
 */
ctrl.controller('VerificationLotteryController', ['$scope', 'AjaxApiService', '$state', function($scope, AjaxApiService, $state){
    // 初始化化
    $scope.defaults = {
        subText: '下一步',
        btnText: '获取验证码',
        verificationTips: '您未收到验证码请点击重新获取',
        disabled: true
    };
    // 提交兑换彩票
    $scope.subFn = function(){
        AjaxApiService.ExchangeLottery({tele: $scope.tele, code: $scope.verification}).then(function(data){
            $scope.defaults.verificationTips = '验证码错误';
            $state.go('entry');
        });
    }


}])

/**
 * 兑换明细
 */
ctrl.controller('ViewExchangeDetailController', ['$scope', 'AjaxApiService', '$q', function($scope, AjaxApiService, $q){
    $scope.items = [];
    $scope.show = false;
    var LoadFn = AjaxApiService.ViewExchangeDetail();
    var loadNew = function(fn){
        var deferred = $q.defer();
        LoadFn.loadNew().then(function(data){
            // 如果有新数据
            if (data.length) {
                $scope.items = data;
                $scope.items.push({time: '2012', 'dirscription': '你好', 'count': '4'})

                deferred.resolve(data);
            } else {
                deferred.reject();
            }
        });
        return deferred.promise;
    }
    var loadOld = function(fn){
        var deferred = $q.defer();
        LoadFn.loadOld().then(function(data){
            // 如果有新数据
            if (data.length) {
                console.log(data.push({time: '2012', 'dirscription': '你好', 'count': '1'}))
                $scope.items = data;
                deferred.resolve(data);
            } else {
                deferred.reject();
            }
        });
        return deferred.promise;
    }
    // 初始化
    loadNew().then(function(data){
        $scope.show = true;
    }, function(reason){
        $scope.show = false;
    });
    $scope.loadNew = loadNew;
    $scope.loadOld = loadOld;


}])
/**
 * 个人信息 》完善资料
 */
ctrl.controller('PrefectArchivesController',  ['$scope', 'AjaxApiService', 'LoginOut', function($scope, AjaxApiService, LoginOut){

    $scope.account = {};
    // 加载用户信息
    AjaxApiService.UserArchives().then(function(data){
        $scope.account = data;
    });
    $scope.loginOut = function(){
        LoginOut();
    }
}])
/**
 * 个人信息 》绑定手机号
 */
ctrl.controller('BindMobileController', ['$scope', 'AjaxApiService', 'DialogService', '$state', 'HintService', function($scope, AjaxApiService, DialogService, $state, HintService){
    // 验证码初始化
    $scope.defaults = {
        subText: '提交',
        btnText: '获取验证码',
        verificationTips: '您未收到验证码请点击重新获取',
        disabled: true
    };
    //绑定手机号
    $scope.subFn = function(){
        AjaxApiService.BindMobile({tele: $scope.tele, code: $scope.verification}).then(function(data){
            if (data.code === '0000') {
                $scope.defaults.verificationTips = '验证码错误';
                HintService.hint({title: '您的账号已成功绑定到' + $scope.tele, hintFn:function(){
                    $state.go('prefactarchives');
                }});
            } else if (data.code === '2014') {

            }

        });
    }
    // 后退提示
    $scope.backTips = function(){
        DialogService.modal({
            key: 'ng.confirm',
            url: '../../app/views/modal/confirm.html',
            accept: function(){
                history.go(-1);
            },
            confirm: {
                tipsText: '手机号将用于登录、安全认证、大奖通知等，您确认不绑定了吗？',
                acceptText: '下次吧',
                cancelText: '继续绑定'
            }
        });
    }
}])

/**
 * 个人信息 》实名信息查看
 */
ctrl.controller('RealNameController', ['$scope', 'UserMsg', function($scope, UserMsg){
    $scope.account = UserMsg.user;
}])
/**
 * 个人信息 》绑定实名信息
 */
ctrl.controller('BindRealNameController', ['$scope', 'AjaxApiService', 'HintService', '$state', function($scope, AjaxApiService, HintService, $state){
    $scope.subBindRealName = function(){
        AjaxApiService.BindRealName({name: $scope.name, id: $scope.id}).then(function(data){
            if (data.code === '0000') {
                HintService.hint({title: '您的实名信息绑定成功', hintFn:function(){
                    $state.go('prefactarchives');
                }});
            } else if (data.code === '2014') {

            }

        })
    }
}])

/**
 * 个人中心
 */
ctrl.controller('AccountCenterController', ['$scope', 'UserMsg', 'AjaxApiService', function($scope, UserMsg, AjaxApiService){
    $scope.user = UserMsg.user.userName ? UserMsg.user : AjaxApiService.UserArchives().then(function(data){
        $scope.user = data;
    });
}])
