import controllerModule from './controllerModule';
import AjaxApiService from '../services/ajaxApiService';
import DialogService from '../services/dialogService';
import HintService from '../services/HintService';
import verificationCode from '../directives/verificationCode'
/**
 * 个人信息 》绑定手机号
 */

class BindMobileController{
    constructor(AjaxApiService, DialogService, HintService, $state) {
        this.AjaxApiService = AjaxApiService;
        this.DialogService = DialogService;
        this.HintService = HintService;
        this.$state = $state;
        // 验证码初始化
        this.defaults = {
            subText: '提交',
            btnText: '获取验证码',
            verificationTips: '您未收到验证码请点击重新获取',
            disabled: true
        };

    }
//绑定手机号
    subFn(tele, verificationCode){
        this.AjaxApiService.BindMobile({tele: tele, code: verificationCode}).then((data) => {

            if (data.code === '0000') {

                this.HintService.hint({title: '您的账号已成功绑定到' + tele, hintFn:() => {
                    this.$state.go('prefactarchives');
                }});
            } else if (data.code === '2014') {
                this.defaults.verificationTips = '验证码错误';
            }

        });
    }
    // 后退提示
    backTips(){
        this.DialogService.modal({
            key: 'ng.confirm',
            url: '../views/modal/confirm.html',
            cancel: function(){
                history.go(-1);
            },
            confirm: {
                tipsText: '手机号将用于登录、安全认证、大奖通知等，您确认不绑定了吗？',
                acceptText: '继续绑定',
                cancelText: '下次吧'
            }
        });
    }

}

BindMobileController.$inject = [ 'AjaxApiService', 'DialogService', 'HintService', '$state'];
export default controllerModule.controller('BindMobileController', BindMobileController);