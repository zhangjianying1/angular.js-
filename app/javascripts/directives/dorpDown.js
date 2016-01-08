/**
 * 下拉刷新加载最新数据
 */
import directiveModule from './directiveModule';

class Dorpdownload
{
    constructor($timeout, $window)
    {

        this.restrict  =  'AE',
        this.transclude = true;


        this.template =  '<div><div style="width:100%;position:absolute; top:-50px; height:50px; left:0; background:#f90">{{ dorpText }}</div><div ng-transclude class="dorpcont" ></div><div class="footer-load" style="height:0; overflow:hidden">load</div></div>';


    }
    link(scope, ele, attrs) {
        let options = {
            element: ele[0],
            pull: ele.find('div').find('div').eq(0),
            scrollH: 80,
            scrollCritical: 68,
            speed: 300,
            deltaY: 0,
            start: 0,
            pullText: '下拉刷新',
            release: '松手刷新',
            refresh: '刷新中',
            bBtn: false,
            footerLoad: ele.find('div').find('div').eq(2)[0]
        }
        let loadNew = attrs.fn;
        let loadOld = attrs.fn2;
        setPullText(options.pullText);
        // 触摸屏幕开始
        ele.bind('touchstart', function (event) {
            console.log(event)
            // 获取触摸点的位置（只获取Y轴）
            options.start = event.touches && event.touches[0].pageY;
            // 禁用动画
            options.element.style.webkitTransitionDuration = '0ms';
            // 当页面滚动大于0时禁用下拉加载
            if (document.body.scrollTop > 0) {
                options.bBtn = true;
            }

            event.stopPropagation();
        });
        // 触摸并滑动屏幕
        ele.bind('touchmove', function (event) {
            // 如果可以滑动
            if (!options.bBtn) {
                // 获取滑动的距离
                options.deltaY = event.touches && event.touches[0].pageY - options.start;

                // 如果滑动向上变成负数 则不执行里面的代码
                if (options.deltaY > 0) {
                    moveTo();
                    // 阻止默认行为（会滚动屏幕，但是滚动已经在最顶端了，但还是阻止吧）
                    event.preventDefault();
                }
            }

        })
        // 触摸并离开屏幕
        ele.bind('touchend', function () {
            scrollOver();
        })
        /**
         * 触摸移动
         */
        function moveTo() {
            // 计算触摸距离（大于向下滑动的最高值时进行阻挠滑动）
            options.deltaY = options.deltaY > options.scrollH ? options.deltaY / (options.deltaY / window.innerHeight + 1) : options.deltaY;

            // 滑动的距离大于 可以松手刷新的时候
            if (options.deltaY > options.scrollCritical) {
                // 提示松手刷新
                setPullText(options.release);
            }

            // 滑动
            options.element.style.webkitTransform = 'translate(0, ' + options.deltaY + 'px)';

        }

        /**
         * 停止滑动并松手离开
         *
         */
        function scrollOver() {
            // 滑动的距离大于可以松手加载的最大值时
            if (options.deltaY > options.scrollCritical) {
                // 滚动到 68
                scrollTo(68);
                // 执行加载函数
                let is = scope.$apply(loadNew);
                is.then(function (data) {
                    setPullText('上次更新时间' + new Date());
                    scrollTo(0)
                }, function (reason) {
                    setPullText('没有最新的数据');
                    scrollTo(0)
                })


            } else {
                // 滚动到 0
                scrollTo(0)
            }
        }

        /**
         * 设置下拉加载的提示文字
         * @param txt {String}
         */
        function setPullText(txt) {
            options.pull.text(txt);
        }

        /**
         * 滚动到
         * @param distance {Number} 滚动到的距离
         * @param speed { Number } 动画时间
         */
        function scrollTo(distance, speed) {
            // 没传时间就用默认时间
            if (!speed) {
                speed = options.speed;
            }
            // 传入的距离
            switch (distance) {
                // 滚动到 0 时
                case 0:
                    // 回复下拉提示文字
                    //setPullText(options.pullText);
                    // 清除 阻止的默认行为
                    setTimeout(function () {
                        // 可以进行下次下拉加载
                        options.bBtn = false;
                        ele[0].removeEventListener('touchmove', preventDefault, false);
                    }, 300)
                    break;
                case 68:
                    // 滚动到 68 (进行加载数据)
                    setPullText(options.refresh);
                    // 绑定的touchmove 里面不执行 shez options.bBtn = true;
                    options.bBtn = true;
                    // 添加新的阻止默认行为的函数
                    ele[0].addEventListener('touchmove', preventDefault, false);
                    break;
                //default:
            }
            options.element.style.webkitTransitionDuration = speed + 'ms';
            options.element.style.webkitTransform = 'translate(0, ' + distance + 'px)';
        }

        // 阻止默认行为（在加载数据的时候禁止用户滑动屏幕）
        function preventDefault(e) {
            e.preventDefault();
        }

        /**
         * 滚动加载
         */
        /**
         * 设置滚动加载的提示文字
         * @param txt {String}
         */
        function setScrollText(txt) {
            options.footerLoad.innerHTML = txt;
        }

        window.onscroll = function () {
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var clientHeight = document.body.clientHeight;

            var footerLoadOffsetTop = 'getBoundingClientRect' in document ? options.footerLoad.getBoundingClientRect().top : options.footerLoad.offsetTop;
            if (scrollTop + clientHeight >= footerLoadOffsetTop) {
                options.footerLoad.style.height = '30px';
                var is = scope.$apply(loadOld);
                is.then(function (data) {
                    setScrollText('滚动加载');
                    options.footerLoad.style.height = '0';

                }, function (reason) {
                    setScrollText('没有数据');
                    options.footerLoad.style.height = '0';
                })


            } else {
                options.footerLoad.style.height = '0';
            }
        }
    }
}
export default directiveModule.directive('dorpdownload', () => new Dorpdownload())