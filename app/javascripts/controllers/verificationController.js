import controllerModule from './controllerModule';
import AjaxApiService from '../services/ajaxApiService';
import VerificationCode from '../directives/verificationCode';
class VerificationController {
    constructor(AjaxApiService, $state){
        this.AjaxApiService = AjaxApiService;
        this.$state = $state;
        // 初始化化
        this.defaults = {
            subText: '下一步',
            btnText: '获取验证码',
            verificationTips: '您未收到验证码请点击重新获取',
            disabled: true
        };

    }
    subFn(tele, verificationCode){
        this.AjaxApiService.ExchangeLottery({tele: tele, code: verificationCode}).then((data) => {
            this.defaults.verificationTips = '验证码错误';
            this.$state.go('entry');
        });
    }
}
VerificationController.$inject = ['AjaxApiService', '$state']
export default controllerModule.controller('VerificationController', VerificationController);