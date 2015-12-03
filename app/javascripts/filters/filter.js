angular.module('app.filter', [])
/**
 * 隐藏后四位
 */
.filter('HideLast', function(){
        return function(input){
            if (input) {
                return input.replace(/[0-9\w]{4}$/, '****');
            }
        }
    })