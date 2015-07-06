/*globals angular, google, c3, Modernizr */

(function () {
    'use strict';
    var fillInTheBlank = function (typeAhead) {
            var termIsFound = function (value, options) {
                    return options.indexOf(value) >= 0;
                };

            return {
                restrict    : 'E',
                replace     : true,
                templateUrl : '/app/partials/fill-in-the-blank.html',
                scope       : {
                    theBlank            : '=',
                    inputName           : '@',
                    label               : '@',
                    typeaheadQueryField : '@',
                    setValidity         : '&'
                },
                link        : function (scope, element) {
                    var lastSet = [],
                        theBlankInput = element.find('input'),
                        isValid,
                        validation = function () {
                            isValid = termIsFound(scope.theBlank, lastSet);

                            scope.$apply(function () {
                                if (scope.theBlank === undefined || scope.theBlank.length === 0) {
                                    scope.fieldStatus = undefined;
                                } else {
                                    scope.fieldStatus = isValid;
                                }

                                if (isValid) {
                                    scope.setValidity({
                                        validationErrorKey: 'term',
                                        isValid: true
                                    });
                                } else {
                                    scope.setValidity({
                                        validationErrorKey: 'term',
                                        isValid: false
                                    });
                                }
                            });
                        };

                    scope.$watch('theBlank', function (newValue) {
                        if (newValue === undefined || newValue === '') {
                            scope.fieldStatus = undefined;
                        }
                    });

                    theBlankInput.autoComplete({
                        source: function (term, response) {
                            typeAhead.get({
                                'field' : scope.typeaheadQueryField,
                                'query' : term
                            }).then(function (data) {
                                lastSet = data;
                                response(data);
                            });
                        },
                        minChars : 1,
                        onSelect: function (event, term) {
                            scope.theBlank = term;

                            validation();
                        }
                    }).on('blur', function () {
                        if (scope.theBlank !== this.value) {
                            scope.theBlank = this.value;
                        }

                        validation();
                    }).on('keypress', function (event) {
                        if (event.which === 13) {
                            validation();
                        }
                    });
                }
            };
        },

        chart = function () {
            var chartWidth = 220,

                colors = ['#ce0606', '#588dae'],

                makeDonut = function (columns, chartElement) {
                    var chartGenerate = c3.generate({
                        bindto: chartElement,
                        data: {
                            columns: columns,
                            type : 'donut'
                        },
                        size: {
                            width: chartWidth
                        },
                        color: {
                            pattern: colors
                        },
                        legend: {
                            show: false
                        }
                    });

                    return chartGenerate;
                },

                mapLegendData = function (chartData) {
                    var data = [],
                        sum = chartData.reduce(function (a, b) {
                            return a[1] + b[1];
                        });

                    console.log(sum);

                    $.each(chartData, function (key, value) {
                        var item = {};

                        item.color = colors[key];
                        item.title = value[0];
                        item.percent = Math.round(value[1] / sum * 1000) / 10;

                        data.push(item);

                        console.log(key, value);
                    });

                    return data;
                };

            return {
                restrict    : 'E',
                replace     : true,
                transclude  : true,
                templateUrl : '/app/partials/chart.html',
                scope       : {
                    chartData : '='
                },
                link        : function (scope, element) {
                    var chartElement = element.find('.chart')[0],
                        chartGenerate;

                    scope.$watch('chartData', function (newchartData) {
                        if (chartGenerate !== undefined) {
                            chartGenerate.destroy();
                            element.attr('aria-hidden', true);
                        }

                        if (newchartData.length) {
                            chartGenerate = makeDonut(newchartData, chartElement);
                            scope.legendData = mapLegendData(newchartData);
                            element.attr('aria-hidden', false);
                        }
                    });
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

                                $("html, body").animate({ scrollTop: scrollTop + "px" }, 150);
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
                    if (!Modernizr.touch) {
                        element.tooltip();
                    }
                }
            };
        };

    angular.module('ads18fApp').directive('fillInTheBlank', ['typeAhead', fillInTheBlank])
                               .directive('chart', [chart])
                               .directive('scrollTo', ['$timeout', scrollTo])
                               .directive('tooltip', [tooltip]);
}());