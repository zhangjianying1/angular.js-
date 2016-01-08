import controllerModule from './controllerModule';
import UserMsg from '../services/userMsgService'
import hideLast from '../filters/filter';

/**
 * 个人信息 》实名信息查看
 */
class RealNameController{
    constructor(UserMsg){
        this.account = UserMsg.userMsg;
//        console.log(HideFilter)/
    }
}
RealNameController.$inject = ['UserMsg'];
export default controllerModule.controller('RealNameController', RealNameController);