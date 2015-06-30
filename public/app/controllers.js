/*globals angular */

(function () {
    'use strict';

    var Ads18fController = function ($scope, $q, $log, doesMedicineCauseReaction, getChartData, MESSAGES) {
        var formIsValid = function () {
                return !$scope.drugCauseSymptom.$valid;
            },

            showResult = function (data) {
                var myMedChartPromise,
                    anyMedChartPromise,
                    topFiveReactionsChartPromise,
                    promiseArray = [];

                $scope.hasSideEffect      = data.found;
                $scope.hasSideEffectYesNo = ($scope.hasSideEffect) ? MESSAGES.YES : MESSAGES.NO;
                $scope.hasSideEffectText  = ($scope.hasSideEffect) ? MESSAGES.YES_TEXT : MESSAGES.NO_TEXT;
                $scope.guide              = (data.message !== undefined) ? data.message[0] : '';
                $scope.resultDrug         = $scope.drug;
                $scope.resultSymptom      = $scope.symptom;

                if ($scope.hasSideEffect) {
                    myMedChartPromise = getChartData.get({
                        'type'    : 'my_med',
                        'drug'    : encodeURIComponent($scope.drug),
                        'symptom' : encodeURIComponent($scope.symptom)
                    });

                    promiseArray.push(myMedChartPromise);

                    anyMedChartPromise = getChartData.get({
                        'type'    : 'any_med',
                        'drug'    : encodeURIComponent($scope.drug),
                        'symptom' : encodeURIComponent($scope.symptom)
                    });

                    promiseArray.push(anyMedChartPromise);

                    myMedChartPromise.then(
                        function (data) {
                            $scope.myMedChartData = data.data;
                            $scope.myMedChartTitle = data.title;
                        },
                        function () {
                            $scope.myMedChartHasError = true;
                        }
                    );

                    anyMedChartPromise.then(
                        function (data) {
                            $scope.anyMedChartData = data.data;
                            $scope.anyMedChartTitle = data.title;
                        },
                        function () {
                            $scope.anyMedChartHasError = true;
                        }
                    );
                } else {
                    topFiveReactionsChartPromise = getChartData.get({
                        'type'    : 'top_five',
                        'drug'    : encodeURIComponent($scope.drug),
                        'symptom' : encodeURIComponent($scope.symptom)
                    });

                    promiseArray.push(topFiveReactionsChartPromise);

                    topFiveReactionsChartPromise.then(
                        function (data) {
                            $scope.topFiveChartTitle = data.title;
                            $scope.topFiveChartData = {
                                "columns" : data.columns,
                                "categories" : data.categories
                            };
                        },
                        function () {
                            $scope.topFiveChartHasError = true;
                        }
                    );
                }

                $q.all(promiseArray).then(
                    function () {
                        $scope.hasResult = true;
                    },
                    function () {
                        $log.warn('there was an error loading chart data');
                        $scope.hasResult = true;
                    }
                );
            },

            submit = function () {
                var params = {
                        'drug'    : encodeURIComponent($scope.drug),
                        'symptom' : encodeURIComponent($scope.symptom)
                    };

                doesMedicineCauseReaction.get(params).then(showResult);
            },

            searchMore = function () {
                $scope.drug        = '';
                $scope.symptom     = '';
                $scope.hasResult   = false;
                $("body").scrollTop(0);
            };

        $scope.drug        = '';
        $scope.symptom     = '';

        $scope.formIsValid = formIsValid;
        $scope.hasResult   = false;
        $scope.hasSideEffect = false;

        $scope.submit      = submit;
        $scope.searchMore  = searchMore;

        $scope.myMedChartTitle = 'Percent of Reported Adverse Effects for Medicine';
        $scope.myMedChartData = [];

        $scope.anyMedChartTitle = 'Percent of all Reported Adverse Effects';
        $scope.anyMedChartData = [];

        $scope.topFiveChartTitle = 'Top Five Reported Adverse Effects';
        $scope.topFiveChartData = {};
    };

    angular.module('ads18fApp').controller('Ads18fController', [
        '$scope',
        '$q',
        '$log',
        'doesMedicineCauseReaction',
        'getChartData',
        'MESSAGES',
        Ads18fController
    ]);
}());