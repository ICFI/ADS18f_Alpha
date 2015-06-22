/*globals angular */

(function () {
    'use strict';

    var Ads18fController = function ($scope, doesDrugCauseSymptom) {
        var formIsValid = function () {
                return !$scope.drugCauseSymptom.$valid;
            },

            submit = function () {
                var params = {
                    'drug'    : $scope.drug,
                    'symptom' : $scope.symptom
                };

                doesDrugCauseSymptom.get(params).then(
                    function (data) {
                        $scope.result            = data;

                        $scope.confirmSideEffect = (data.found === "true") ? "Yes" : "No";
                        $scope.guide             = data.spl_medguide;
                        $scope.resultDrug        = $scope.drug;
                        $scope.resultSymptom     = $scope.symptom;

                        $scope.hasResult         = true;
                    }
                );
            };

        $scope.drug        = '';
        $scope.symptom     = '';

        $scope.formIsValid = formIsValid;
        $scope.hasResult   = false;
        $scope.hasSideEffect = false;
        $scope.submit      = submit;
    };

    angular.module('ads18fApp').controller('Ads18fController', [
        '$scope',
        'doesDrugCauseSymptom',
        Ads18fController
    ]);
}());