/*globals angular, google */

(function () {
    'use strict';
    var fillInTheBlank = function (typeAhead) {
        return {
            restrict    : 'E',
            replace     : true,
            templateUrl : '/app/partials/fill-in-the-blank.html',
            scope       : {
                theBlank            : '=',
                label               : '@',
                typeaheadQueryField : '@'
            },
            link        : function (scope, element) {
                element.find('input').autoComplete({
                    source: function (term, response) {
                        typeAhead.get({
                            'field' : scope.typeaheadQueryField,
                            'query' : term
                        }).then(function (data) {
                            response(data);
                        });
                    },
                    minChars : 2,
                    onSelect: function (event, term, item) {
                        scope.$apply(function () {
                            scope.theBlank = term;
                        });
                    }
                });
            }
        };
    };

    angular.module('ads18fApp').directive('fillInTheBlank', ['typeAhead', fillInTheBlank]);
}());