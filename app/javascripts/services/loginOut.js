// 退出登录
import serviceModule from './module';
import AjaxService from './ajaxService';
import AjaxApiService from './ajaxApiService';
import UserMsg from './userMsgService';

class LoginOut{
    constructor(UserMsg, AjaxService){
        this.AjaxService = AjaxService;
        this.UserMsg = UserMsg;
    }
    loginOut(){
        this.AjaxService.ajax('get', '/', {userCode: this.UserMsg.userMsg.userName}).then((data) => {
            this.UserMsg.setUserMsg();
            console.log(this.UserMsg.userMsg)
        })
    }
}
LoginOut.$inject = ['UserMsg', 'AjaxService'];
export default serviceModule.service('LoginOut', LoginOut);