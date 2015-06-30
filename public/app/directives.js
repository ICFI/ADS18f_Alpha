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
                    }).on('blur', function () {
                        if (scope.theBlank !== this.value) {
                            scope.theBlank = this.value;
                        }
                    });
                }
            };
        },

        chart = function () {
            var chartWidth = 220,

                makeDonut = function (columns, chartElement) {
                    var chartGenerate = c3.generate({
                        bindto: chartElement,
                        data: {
                            columns: columns,
                            type : 'donut'
                        },
                        size: {
                            width: chartWidth
                        }
                    });

                    return chartGenerate;
                },

                makeBar = function (columns, categories, chartElement) {
                    var chartGenerate = c3.generate({
                        bindto: chartElement,
                        data: {
                            columns: columns,
                            type : 'bar',
                        },
                        size: {
                            width: chartWidth
                        },
                        axis: {
                            rotated: true,
                            x: {
                                type: 'categorized',
                                categories: categories
                            },
                            y: {
                                show: false,
                                ticks: {
                                    culling: {
                                        max: 1
                                    }
                                }
                            }
                        },
                        labels: true,
                        legend: {
                            show: false
                        },
                        color: {
                            pattern: ['#fb6509', '#fa3405', '#b7010c', '#700d10', '#000000']
                        }
                    });

                    return chartGenerate;
                };

            return {
                restrict    : 'E',
                replace     : true,
                transclude  : true,
                template    : '<div class="chart-wrapper" aria-hidden="true"><h3 class="chart-header"><ng-transclude></ng-transclude></h3><div class="chart"></div></div>',
                scope       : {
                    type      : '@',
                    chartData : '='
                },
                link        : function (scope, element) {
                    var chartElement = element.find('.chart')[0],
                        chartGenerate;

                    if (scope.type !== 'top_five') {
                        scope.$watch('chartData', function (newchartData, oldchartData) {
                            if (oldchartData.length) {
                                chartGenerate.destroy();
                                element.attr('aria-hidden', true);
                            }

                            if (newchartData.length) {
                                chartGenerate = makeDonut(newchartData, chartElement);
                                element.attr('aria-hidden', false);
                            }
                        });
                    } else {
                        scope.$watch('chartData', function (newchartData, oldchartData) {
                            if (!$.isEmptyObject(oldchartData)) {
                                chartGenerate.destroy();
                                element.attr('aria-hidden', true);
                            }

                            if (!$.isEmptyObject(newchartData)) {
                                chartGenerate = makeBar(newchartData.columns, newchartData.categories, chartElement);
                                element.attr('aria-hidden', false);
                            }
                        });
                    }
                }
            };
        },

        scrollTo = function ($timeout) {
            return {
                restrict    : 'A',
                link        : function (scope, element, attrs) {
                    attrs.$observe('scrollOn', function (newValue) {
                        var scrollFocus,
                            scrollTop;

                        if (newValue === 'true') {
                            $timeout(function () {
                                scrollFocus = element.find('.scroll-focus').eq(0);
                                scrollTop = scrollFocus.offset().top;

                                scrollFocus.focus();

                                $("html, body").animate({ scrollTop: scrollTop + "px" }, 200);
                            });
                        }
                    });
                }
            };
        },

        tooltip = function () {
            return {
                restrict    : 'A',
                link        : function (scope, element) {
                    element.tooltip();
                }
            };
        };

    angular.module('ads18fApp').directive('fillInTheBlank', ['typeAhead', fillInTheBlank])
                               .directive('chart', [chart])
                               .directive('scrollTo', ['$timeout', scrollTo])
                               .directive('tooltip', [tooltip]);
}());