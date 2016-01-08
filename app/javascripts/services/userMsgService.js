
import serviceModule from './module';

class UserMsg{
    constructor(){
        this.userMsg = {};
    }
    setUserMsg(param){
        this.userMsg = param;
    }
}
export default serviceModule.service('UserMsg', UserMsg);