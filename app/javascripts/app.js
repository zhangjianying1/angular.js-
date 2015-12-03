var app = angular.module('myApp', ['ui.router', 'indexCtrl', 'app.hintcontroller', 'app.service', 'app.hintservice', 'app.directive', 'app.filter']);

app.run(['$rootScope', 'LoadingService', function($rootScope, loadingService){
    $rootScope.$on('showloading', function(){
        loadingService.showLoading();
    })
    $rootScope.$on('hideloading', function(){
        loadingService.hideLoading();
    })
    $rootScope.$on('$routeChangeStart', function($evt, $next, $curr){

    });
    $rootScope.$on('$routeChangeSuccess', function($evt, $next){
        console.log($evt)
    });
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider
      .state('verfifcationlottery', {
          url: '/',
          templateUrl: '../views/exchangelottery/exchangelottery.html',
          controller: 'VerificationLotteryController'
      })
      .state('entry', {
          url: '/entry',
          templateUrl: '../views/index/index.html',
      })
      .state('viewexchangedetail', {
          url: '/viewexchangedetail',
          templateUrl: '../views/exchangelottery/viewexchangedetail.html',
          controller: 'ViewExchangeDetailController'
      })
      .state('prefactarchives', {
          url: '/prefectarchives',
          templateUrl: '../views/account/prefectarchives.html',
          controller: 'PrefectArchivesController'
      })
      .state('bindmobile', {
          url: '/bindmobile',
          templateUrl: '../views/account/bindmobile.html',
          controller: 'BindMobileController'
      })
      .state('bindrealname', {
          url: '/bindrealname',
          templateUrl: '../views/account/bindrealname.html',
          controller: 'BindRealNameController'
      })
      .state('realname', {
          url: '/realname',
          templateUrl: '../views/account/realname.html',
          controller: 'RealNameController'
      })
      .state('accountcenter', {
          url: '/accountcenter',
          templateUrl: '../views/account/accountcenter.html',
          controller: 'AccountCenterController'
      })



}]);
