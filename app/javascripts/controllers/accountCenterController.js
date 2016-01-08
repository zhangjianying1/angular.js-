import controllerModule from './controllerModule';
import UserMsg from '../services/userMsgService';
import AjaxApiService from '../services/ajaxApiService';
/**
 * 个人中心
 */
class AccountCenterController {
    constructor(UserMsg, AjaxApiService){
        this.user = UserMsg.userMsg.userName ? UserMsg.userMsg : AjaxApiService.UserArchives().then((data) => {
            this.user = data;
        });
    }
}
AccountCenterController.$inject = ['UserMsg', 'AjaxApiService'];
export default controllerModule.controller('AccountCenterController', AccountCenterController)

