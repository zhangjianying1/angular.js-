import controllerModule from './controllerModule';
/**
 * 个人信息 》实名信息绑定
 */
class BindRealNameController{
    constructor(AjaxApiService, HintService, $state){
        this.AjaxApiService = AjaxApiService;
        this.HintService = HintService;
        this.$state = $state;
    }
    subBindRealName(name, id) {
        this.AjaxApiService.BindRealName({name: name, id: id}).then((data) => {
            if (data.code === '0000') {
                this.HintService.hint({title: '您的实名信息绑定成功', hintFn: () => {
                    this.$state.go('prefactarchives');
                }});
            } else if (data.code === '2014') {

            }

        })
    }
}
BindRealNameController.$inject = ['AjaxApiService', 'HintService', '$state'];
export default controllerModule.controller('BindRealNameController', BindRealNameController);