/**
 * 个人信息 》完善资料
 */
import controllerModule from './controllerModule';
import AjaxApiService from '../services/ajaxApiService';
import LoginOut from '../services/loginOut';

class PrefectArchivesController{
    constructor(AjaxApiService, LoginOut){
        // 加载用户信息
        AjaxApiService.UserArchives().then((data) => {
            this.account = data;
        });
        this.loginOut = function(){
            LoginOut.loginOut();
        }
    }

}

PrefectArchivesController.$inject = ['AjaxApiService', 'LoginOut']
export default controllerModule.controller('PrefectArchivesController', PrefectArchivesController);