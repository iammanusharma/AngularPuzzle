(function(angular) {
    'use strict';
    // https://github.com/sandor11/isentia-angular-ui
    angular.module('webApp').directive('puzzle', ['$rootScope', '$timeout', 'puzzleFactory',
        function ($rootScope, $timeout, puzzleFactory) {
            return {
                restrict: 'E',
                link: function ($scope, $element, $attr) {
                    // extract our config options from out puzzle element
                    var rows = +$attr.rows;
                    var pieces = +$attr.pieces;
                    var width = +$attr.width;
                    var src = $attr.board;

                    var puzzle = puzzleFactory.instance(rows, pieces, width, src);
                    $element.append(puzzle.getContainer());                    

                    // test code for an explode effect to begin the puzzle game
                    $scope.$on('puzzle.start', function(event, shuffle) {
                        if (shuffle) {
                            puzzle.shuffle();
                        }
                        puzzle.start();
                    });
                }
            };
        }]
    );
})(window.angular);