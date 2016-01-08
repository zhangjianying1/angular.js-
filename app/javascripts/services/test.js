import serviceModule from './module';

const HTTP = new WeakMap();

class BookShelfService
{
    constructor($http)
    {
        HTTP.set(this, $http);
    }

    getActiveBooks(){
        return HTTP.get(this).get('/').then(result => result.data );
    }



    static bookShelfFactory($http){
        return new BookShelfService($http);
    }
}

BookShelfService.bookShelfFactory.$inject = ['$http'];



export default serviceModule.factory('test', BookShelfService.bookShelfFactory);