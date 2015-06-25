/*globals angular, google, c3 */

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
                        minChars : 1,
                        onSelect: function (event, term) {
                            scope.$apply(function () {
                                scope.theBlank = term;
                            });
                        }
                    });
                }
            };
        },

        chart = function () {
            return {
                restrict    : 'E',
                replace     : true,
                transclude  : true,
                template    : '<div class="chart-wrapper"><h3><ng-transclude></ng-transclude></h3><div class="chart"></div></div>',
                scope       : {
                    type                : '@',
                    typeaheadQueryField : '@'
                },
                link        : function (scope, element) {
                    var chartElement = element.find('.chart'),
                        chartGenerate;

                    if (scope.type !== 'top_five') {
                        chartGenerate = c3.generate({
                            bindto: chartElement[0],
                            data: {
                                columns: [
                                    ['searchTerm', 44484],
                                    ['others', 4284098]
                                ],
                                type : 'donut'
                            },
                            names: {
                                searchTerm: 'Side Effect Count',
                                others: 'All Other Side Effects'
                            },
                            size: {
                                width: 235
                            }
                        });
                    } else {
                        chartGenerate = c3.generate({
                            bindto: chartElement[0],
                            data: {
                                columns: [
                                    ['sideEffects', 44484, 39012, 23012, 1711, 92]
                                ],
                                type : 'bar',
                            },
                            size: {
                                width: 235
                            },
                            axis: {
                                rotated: true,
                                y: {
                                    show: false
                                },
                                x: {
                                    show: false
                                }
                            },
                            color: {
                                pattern: ['#fb6509', '#fa3405', '#b7010c', '#700d10', '#000000']
                            }
                        });
                    }
                }
            };
        };

    angular.module('ads18fApp').directive('fillInTheBlank', ['typeAhead', fillInTheBlank])
                               .directive('chart', [chart]);
}());