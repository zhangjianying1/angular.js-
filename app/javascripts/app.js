import angular from 'angular';
import uiRouter from 'angular-ui-router';
import oclazyload from 'oclazyload';
import appService from './services/module';
import appController from './controllers/controllerModule';
import appDirective from './directives/directiveModule';
import appFilter from './filters/filterModule';
import VerificationLotteryController from './controllers/verificationController';
import ViewExchangeDetailController from './controllers/viewExchangeDetailController';
import PrefectArchivesController from './controllers/prefectArchivesController';
import BindMobileController from './controllers/bindMobileController';
import BindRealNameController from './controllers/bindRealNameController';
import RealNameController from './controllers/realNameController';
import AccountCenterController from './controllers/accountCenterController';
import AjaxApiService from './services/ajaxApiService';
import LoadingService from './services/loadingService';

//, 'app.hintcontroller', 'app.service', 'app.hintservice', 'app.directive', 'app.filter'
var app = angular.module('myApp', [uiRouter, oclazyload, appController.name, appService.name, appDirective.name, appFilter.name]);

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
          controller: 'VerificationController',
          controllerAs: 'vm'
      })
      .state('entry', {
          url: '/entry',
          templateUrl: '../views/index/index.html',
      })
      .state('viewexchangedetail', {
          url: '/viewexchangedetail',
          templateUrl: '../views/exchangelottery/viewexchangedetail.html',
          controller: 'ViewExchangeDetailController',
          controllerAs: 'vm'
      })
      .state('prefactarchives', {
          url: '/prefectarchives',
          templateUrl: '../views/account/prefectarchives.html',
          controller: 'PrefectArchivesController',
          controllerAs: 'vm'
      })
      .state('bindmobile', {
          url: '/bindmobile',
          templateUrl: '../views/account/bindmobile.html',
          controller: 'BindMobileController',
          controllerAs: 'vm'
      })
      .state('bindrealname', {
          url: '/bindrealname',
          templateUrl: '../views/account/bindrealname.html',
          controller: 'BindRealNameController',
          controllerAs: 'vm'
      })
      .state('realname', {
          url: '/realname',
          templateUrl: '../views/account/realname.html',
          controller: 'RealNameController',
          controllerAs: 'vm'
      })
      .state('accountcenter', {
          url: '/accountcenter',
          templateUrl: '../views/account/accountcenter.html',
          controller: 'AccountCenterController',
          controllerAs: 'vm'
      })



}]);
