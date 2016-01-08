# webpack工程搭建的angular.js
webpack非常的热门，功能也非常强大，集合了一些非常不错的功能，编译压缩代码，模块化开发等，es6现在也是javascript发展的新一代产物，webpack可以编译es6,实时的推送编译好的js,我们在编写js脚本的同时，浏览器可以不用刷新就可以呈现我们的更改，非常的酷。
# webpack-dev-server 启动服务
webpack-dev-server --hot --progress --colors 启动web服务，我们在浏览器输入 localhost:8080/webpack-dev-server/app/__bulid/(app/__build/是我的工作编译后的目录)，因为是angular.js，我们要想随时的呈现css或者angular一些directive中的模板的更改效果，我们可以启动grunt watch 来检测css和模板的更改，更改后的css和模板copy到我的编译后的目录。这样一来我们便可以随便的编写我们的代码了，浏览器实时更新。


