/*globals angular */

(function () {
    'use strict';

    var Ads18fController = function ($scope, doesDrugCauseSymptom, MESSAGES) {
        var formIsValid = function () {
                return !$scope.drugCauseSymptom.$valid;
            },

            submit = function () {
                var params = {
                    'drug'    : encodeURIComponent($scope.drug),
                    'symptom' : encodeURIComponent($scope.symptom)
                };

                doesDrugCauseSymptom.get(params).then(
                    function (data) {
                        $scope.result             = data;

                        $scope.hasSideEffect      = data.found;
                        $scope.hasSideEffectYesNo = ($scope.hasSideEffect) ? MESSAGES.YES : MESSAGES.NO;
                        $scope.hasSideEffectText  = ($scope.hasSideEffect) ? MESSAGES.YES_TEXT : MESSAGES.NO_TEXT;
                        $scope.guide              = data.spl_medguide;
                        $scope.resultDrug         = $scope.drug;
                        $scope.resultSymptom      = $scope.symptom;

                        $scope.hasResult          = true;
                    }
                );
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
    };

    angular.module('ads18fApp').controller('Ads18fController', [
        '$scope',
        'doesDrugCauseSymptom',
        'MESSAGES',
        Ads18fController
    ]);
}());