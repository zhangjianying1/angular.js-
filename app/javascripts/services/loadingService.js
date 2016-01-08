import angular from 'angular';
import serviceModule from './module';

class LoadingService
{
    constructor($compile, $document, $rootScope)
    {
        this.$compile = $compile;
        this.$document = $document;
        this.$rootScope = $rootScope;
        this.load = angular.element('<div class="loading" style="position:absolute; top:0; left:50%; background:#f90;">加载中...</div>');
    }
    showLoading() {

        this.$document.find('body').append(this.load);
        let scope = this.$rootScope.$new();
        this.$compile(this.load)(scope);
    }

    hideLoading() {
        this.load.remove();
    }
}
LoadingService.$inject = ['$compile', '$document', '$rootScope']

export default serviceModule.service('LoadingService', LoadingService)