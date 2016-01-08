import filterModule from './filterModule';
/**
 * 隐藏后四位
 */

class HideFilter{
    hideLast(input){
        if (input) {
            return input.replace(/[0-9\w]{4}$/, '****');
        }
    }
    static hideFilter(){
        return new HideFilter().hideLast;
    }
}
export default filterModule.filter('hideLast', HideFilter.hideFilter);