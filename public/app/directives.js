/*globals angular, google */

(function () {
    'use strict';
    var fillInTheBlank = function () {
        return {
            restrict    : 'E',
            replace     : true,
            templateUrl : '/app/partials/fill-in-the-blank.html',
            scope       : {
                theBlank : '=',
                label    : '@'
            }
        };
    };

    angular.module('ads18fApp').directive('fillInTheBlank', [fillInTheBlank]);
}());