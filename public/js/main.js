(function(angular) {
    'use strict';
    var webApp = angular.module('webApp', ['ui.router', 'ui.bootstrap']);

     webApp.factory('appConfig', [function () {
            function getEnv() {
                return 'development';
            }

            var schemas = {
                production: {
                },
                development: {
                }
            };

            return schemas[getEnv()];
        }
    ]);

    webApp.run(['$location', '$state', '$rootScope', '$timeout', '$window', 'appConfig',
        function ($location, $state, $rootScope, $timeout, $window, appConfig) {        
            $rootScope.appConfig = appConfig;
        }
    ]);
})(window.angular);