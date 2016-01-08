import angular from 'angular';
import serviceModule from './module';
//import DialogCtrl form '../controllers/dialogCtroller'
class DialogService {
    constructor($rootScope, $document, $compile){
        this.$rootScope = $rootScope;
        this.$document = $document;
        this.$compile = $compile;
        this.dialogMap = {};
    }
    modal(param, data){
        let confirmData = param.confirm;




        let html = '<div><p>' + confirmData.tipsText + '</p><button ng-click="accept()">' + confirmData.acceptText + '</button>' +
            '<button ng-click="cancel()">' + confirmData.cancelText + '</button></div>'
        let confirm = angular.element(html);
        let mask = angular.element('<div id="mask"></div>');
        let newScope = this.$rootScope.$new();
        angular.extend(newScope, {
            accept: () =>{
                this.dismiss(param.key)
            },
            cancel: () => {
                this.accept(param.key, 'close')
            }
        });
        this.$document.find('body').append(confirm);
        this.$document.find('body').append(mask);
        this.$compile(confirm)(newScope);
        this.dialogMap[param.key] = param;
        this.dialogMap[param.key].confirm = confirm;
        this.dialogMap[param.key].mask = mask;


    }
    accept(key, result){
        this.dismiss(key);
        if (this.dialogMap[key].cancel) {
            this.dialogMap[key].cancel();
        }
    }
    dismiss(key){
        this.dialogMap[key].confirm.remove();
        this.dialogMap[key].mask.remove();
    }
    static dialogService($rootScope, $document, $compile){
        return new DialogService($rootScope, $document, $compile)
    }
}
DialogService.dialogService.$inject = ['$rootScope', '$document', '$compile'];
export default serviceModule.factory('DialogService', DialogService.dialogService);