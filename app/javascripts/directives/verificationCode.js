import direcitveModule from './directiveModule';
import AjaxService from '../services/ajaxService';
function verificationCode (AjaxService, $timeout, $parse) {
    return {
        restrice: 'AE',
        transclude: true,
        templateUrl: './views/includes/verificationcode.html',
        link: function (scope, ele, attrs) {

            scope.defaultData = scope.vm.defaults;
            scope.subFn = () => scope.vm.subFn(scope.tele, scope.verificationCode);
            scope.getCode = function (val) {

                if (scope.defaultData.disabled && !val) {
                    scope.defaultData.btnText = '获取中...';
                    scope.defaultData.disabled = false;
                    AjaxService.ajax('get', '/', {mobile: scope.tele}).then(function (data) {
                        data = {name: 'agent'};
                        if (data.name === 'agent') {
                            scope.defaultData.btnText = '10'
                            setIntervalTime();
                        }
                    }, function (err) {
                        if (err) {
                            console.log(err)
                        }
                    })
                }

            }

            function setIntervalTime() {
                $timeout(function () {
                    scope.defaultData.btnText--;
                    if (scope.defaultData.btnText > 0) {
                        setIntervalTime()
                    } else {
                        scope.defaultData.btnText = '获取验证码';
                        scope.defaultData.disabled = true;
                        $timeout.cancel();
                    }
                }, 1000)
            }
        }


    }
}

verificationCode.$inject = ['AjaxService', '$timeout', '$parse']
export default direcitveModule.directive('verificationCode', verificationCode);