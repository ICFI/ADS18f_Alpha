/*globals angular */

(function () {
    'use strict';

    var Ads18fController = function ($scope, $location, $routeParams, MESSAGES) {
            var formIsValid = function () {
                    return $scope.drugCauseSymptom.$valid;
                },

                submit = function () {
                    $scope.statusMessage = '';

                    if (formIsValid()) {
                        $location.path('/drug-symptom/' + $scope.drug + '/' + $scope.symptom).search('drug', null).search('symptom', null);
                    } else if ($scope.drug === '' || $scope.drug === undefined || $scope.symptom === '' || $scope.symptom === undefined) {
                        $scope.statusMessage = MESSAGES.INVALID_SEARCH;
                        $location.path('/');
                    } else if ($scope.drugCauseSymptom.drug.$invalid && $scope.drugCauseSymptom.symptom.$valid) {
                        $location.path('/not-found/drug/' + $scope.drug + '/').search('symptom', $scope.symptom);
                    } else if ($scope.drugCauseSymptom.drug.$valid && $scope.drugCauseSymptom.symptom.$invalid) {
                        $location.path('/not-found/symptom/' + $scope.symptom + '/').search('drug', $scope.drug);
                    } else {
                        $location.path('/not-found/both/' + $scope.drug + '/' + $scope.symptom + '/');
                    }
                },

                searchMore = function () {
                    $scope.drug        = '';
                    $scope.symptom     = '';
                    $scope.hasResult   = false;
                    $("body").scrollTop(0);
                    $("#drug").focus();
                };

            $scope.$on('$routeChangeSuccess', function (event, next, current) {
                if (next) {
                    $scope.drug              = $routeParams.drug || '';
                    $scope.symptom           = $routeParams.symptom || '';
                } else {
                    searchMore();
                }
            });

            $scope.statusMessage     = '';
            $scope.formIsValid       = formIsValid;
            $scope.submit            = submit;

            // $scope.$on('clearSearch', searchMore);
        },

        DrugSymptom = function ($scope, $location, $routeParams, $q, $log, doesMedicineCauseReaction, getChartData, MESSAGES) {
            var showResult = function (data) {
                    var myMedChartPromise,
                        anyMedChartPromise,
                        promiseArray = [];

                    $scope.hasSideEffect      = data.found;
                    $scope.hasSideEffectYesNo = ($scope.hasSideEffect) ? MESSAGES.YES : MESSAGES.NO;
                    $scope.hasSideEffectText  = ($scope.hasSideEffect) ? MESSAGES.YES_TEXT : MESSAGES.NO_TEXT;
                    $scope.guide              = (data.message !== undefined) ? data.message[0] : '';

                    if ($scope.hasSideEffect) {
                        myMedChartPromise = getChartData.get({
                            'type'    : 'my_med',
                            'drug'    : encodeURIComponent($scope.resultDrug),
                            'symptom' : encodeURIComponent($scope.resultSymptom)
                        });

                        promiseArray.push(myMedChartPromise);

                        myMedChartPromise.then(
                            function (data) {
                                $scope.myMedChartData = data.data;
                                $scope.myMedChartTitle = data.title;
                                $scope.myMedChartHasError = false;
                            },
                            function () {
                                $scope.myMedChartHasError = true;
                            }
                        );
                    }

                    anyMedChartPromise = getChartData.get({
                        'type'    : 'any_med',
                        'drug'    : encodeURIComponent($scope.resultDrug),
                        'symptom' : encodeURIComponent($scope.resultSymptom)
                    });

                    promiseArray.push(anyMedChartPromise);

                    anyMedChartPromise.then(
                        function (data) {
                            $scope.anyMedChartData = data.data;
                            $scope.anyMedChartTitle = data.title;
                            $scope.anyMedChartHasError = false;
                        },
                        function () {
                            $scope.anyMedChartHasError = true;
                        }
                    );

                    $q.all(promiseArray).then(
                        function () {
                            $scope.hasResult = true;
                            $scope.setFocus = true;
                        },
                        function () {
                            $log.warn('there was an error loading chart data');
                            $scope.hasResult = true;
                            $scope.setFocus = true;
                        }
                    );
                };

            $scope.resultDrug         = $routeParams.drug;
            $scope.resultSymptom      = $routeParams.symptom;

            doesMedicineCauseReaction.get({
                'drug'    : $scope.resultDrug,
                'symptom' : $scope.resultSymptom
            }).then(showResult);

            $scope.hasResult         = false;
            $scope.setFocus          = false;
            $scope.hasSideEffect     = false;

            $scope.myMedChartTitle   = 'Percent of Reported Adverse Effects for Medicine';
            $scope.myMedChartData    = [];

            $scope.anyMedChartTitle  = 'Percent of all Reported Adverse Effects';
            $scope.anyMedChartData   = [];

            $scope.searchMore = function () {
                $location.path('/').search('drug', null).search('symptom', null);
            };
        },

        NotFound = function ($scope, $location, $route, $routeParams, MESSAGES) {
            var terms = [],
                term;

                // debugger;

            if ($route.current.pathParams.drug) {
                terms.push($route.current.pathParams.drug);
            }

            if ($route.current.pathParams.symptom) {
                terms.push($route.current.pathParams.symptom);
            }

            term = terms.join(" or ");

            $scope.setFocus = true;
            $scope.message = MESSAGES.INVALID_TERM.replace('%term%', term);
            $scope.searchMore = function () {
                $location.path('/').search('drug', null).search('symptom', null);
            };
        };

    angular.module('ads18fApp')
        .controller('Ads18fController', [
            '$scope',
            '$location',
            '$routeParams',
            'MESSAGES',
            Ads18fController
        ])
        .controller('DrugSymptom', [
            '$scope',
            '$location',
            '$routeParams',
            '$q',
            '$log',
            'doesMedicineCauseReaction',
            'getChartData',
            'MESSAGES',
            DrugSymptom
        ])
        .controller('NotFound', [
            '$scope',
            '$location',
            '$route',
            '$routeParams',
            'MESSAGES',
            NotFound
        ]);
}());