import module from './module';
import AjaxService from './ajaxService';
import Usermsg from './userMsgService';
class AjaxApiService {
    constructor($q, AjaxService, UserMsg){
        this.$q = $q;
        this.AjaxService = AjaxService;
        this.UserMsg = UserMsg;
    }
    ExchangeLottery (param){
        var deferred = this.$q.defer();
        this.AjaxService.ajax('get', '/', param).then(function(data){
            data = {code: '0000'}
            if (data.code === '0000') {
                deferred.resolve(data);
            } else {
                deferred.reject();
            }

        })
        return deferred.promise;
    }
    ViewExchangeDetail(){
        return {
            loadNew: () => {
                var deferred = this.$q.defer();
                this.AjaxService.ajax('get', '/').then(function(data){
                    data = {code: '0000', result: [{time: '2012', 'dirscription': '你好', 'count': '4'}]};

                    if (data.code === '0000') {
                        deferred.resolve(data.result);

                    } else {
                        defrred.reject();
                    }
                })
                return deferred.promise;
            },
            loadOld: () => {
                var deferred = this.$q.defer();
                this.AjaxService.ajax('get', '/ ').then(function(data){
                    data = {code: '0000', result: [{time: '2012', 'dirscription': '你好', 'count': '4'}]};

                    if (data.code === '0000') {
                        deferred.resolve(data.result);

                    } else {
                        defrred.reject();
                    }
                })
                return deferred.promise;
            }
        }

    }
    // 个人资料
    UserArchives(){

        var deferred = this.$q.defer();
        this.AjaxService.ajax('get', '/').then((data) => {
            data = {code: '0000', userName: '彩米', realName: '', mobile: '1', cardCode: '123456777777',  cashAmount: '80.00', presentAmount: '80.00', drawAmount: '80.00'};

            this.UserMsg.setUserMsg(data);
            if (data.code === '0000') {
                deferred.resolve(data);
            }
        }, function(reason){
            deferred.reject(reason);
        })
        return deferred.promise;

    }
    BindMobile(param){
        var deferred = this.$q.defer();
        this.AjaxService.ajax('get', '/', param).then(function (data) {
            data = {code: '0000'};
            if (data.code === '0000') {
                deferred.resolve(data);
            }

        })
        return deferred.promise;
    }
    // 绑定实名
    BindRealName(param){
        var deferred = this.$q.defer();
        this.AjaxService.ajax('get', '/', param).then(function(data){
            data = {code: '0000'};
            if (data.code === '0000') {
                deferred.resolve(data);
            }
        })
        return deferred.promise;
    }
}
AjaxApiService.$inject = ['$q', 'AjaxService', 'UserMsg']
export default module.service('AjaxApiService', AjaxApiService);
//export default module.service('AjaxApiService', ['AjaxService', '$q',  function(AjaxService, $q){
//    return {
//        ExchangeLottery: function(param){
//            var deferred = $q.defer();
//            AjaxService.ajax('get', '/package.json', param).then(function(data){
//                data = {code: '0000'}
//                if (data.code === '0000') {
//                    deferred.resolve(data);
//                } else {
//                    deferred.reject();
//                }
//
//            })
//            return deferred.promise;
//        }
//
//    }
//}])