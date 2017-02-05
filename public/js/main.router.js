(function(angular) {
    'use strict';
    
    angular.module('webApp').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/');
            
            $stateProvider
                    .state('app', {
                        abstract: true,
                        templateUrl: './js/app/Components/app/app.html'
                    })
                    .state('app.puzzle', {
                        url: '/',
                        templateUrl: './js/app/Components/puzzle/puzzle.html',
                        controller: 'puzzleController'
                    });

            $locationProvider.html5Mode(true);
        }
    ]);
})(window.angular);