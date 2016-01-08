import controllerModule from './controllerModule';
import AjaxApiService from '../services/ajaxApiService';
import dorpdownload from '../directives/dorpDown';
class ViewExchangeDetailController {
    constructor($q, AjaxApiService) {
        this.$q = $q;
        this.AjaxApiService = AjaxApiService;
        this.items = [];
        this.show = false;
        let LoadFn = AjaxApiService.ViewExchangeDetail();
        let loadNew = (fn) => {
            var deferred = $q.defer();
            LoadFn.loadNew().then((data) => {
                // 如果有新数据
                if (data.length) {
                    if (this.items.length) {
                        this.items = data.concat(this.items)
                    } else {
                        this.items.push({time: '2012', 'dirscription': '你好f', 'count': '66'})
                    }

                    deferred.resolve(data);
                } else {
                    deferred.reject();
                }
            });
            return deferred.promise;
        }
        let loadOld = (fn) => {
            let deferred = $q.defer();
            LoadFn.loadOld().then((data) => {
                // 如果有新数据
                if (data.length) {
                    this.items = data;
                    deferred.resolve(data);
                } else {
                    deferred.reject();
                }
            });
            return deferred.promise;
        }
        // 初始化
        loadNew().then((data) => {
            this.show = true;
        }, (reason) => {
            this.show = false;
        });
        this.loadNew = loadNew;
        this.loadOld = loadOld;
    }
}
ViewExchangeDetailController.$inject = ['$q', 'AjaxApiService'];
export default controllerModule.controller('ViewExchangeDetailController', ViewExchangeDetailController);