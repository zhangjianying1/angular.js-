import angular from 'angular';
import serviceModule from './module';
const HTTP = new WeakMap();
const DOCUMENT = new WeakMap();
const ROOTSCOPE = new WeakMap();
const COMPILE = new WeakMap();
class HintService{
    constructor($http, $document, $rootScope, $compile){
        HTTP.set(this, $http);
        DOCUMENT.set(this, $document);
        ROOTSCOPE.set(this, $rootScope);
        COMPILE.set(this, $compile);
    }
    hint(param, url){
        HTTP.get(this).get(url || '../../views/modal/alert.html').then((data) => {
            let hint = angular.element(data.data);
            let mask = angular.element('<div id="mask"></div>');
            let doc = DOCUMENT.get(this);
            if (doc.find('#alert')){
                doc.find('body').prepend(hint)
                doc.find('body').prepend(mask)
            }

            var scope = angular.extend(ROOTSCOPE.get(this).$new(),
                param,
                {confirm: function(){
                    hint.remove();
                    mask.remove();
                    param.hintFn()
                }
                });
            COMPILE.get(this)(hint)(scope)
        })
    }
    static hintService($http, $document, $rootScope, $compile){
        return new HintService($http, $document, $rootScope, $compile);
    }
}
HintService.hintService.$inject = ['$http', '$document', '$rootScope',  '$compile'];
export default serviceModule.factory('HintService', HintService.hintService);