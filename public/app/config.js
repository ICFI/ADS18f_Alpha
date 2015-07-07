/*globals angular */

(function () {
    'use strict';

    var DATA_PATHS = {
            'TYPEAHEAD_DRUG'    : '/api/v1/medicine/typeahead/',
            'TYPEAHEAD_SYMPTOM' : '/api/v1/sideeffect/typeahead/',
            'DRUG_SYMPTOM'      : '/api/v1/drug/label/%drug%/%symptom%',
            'CHART'             : '/api/v1/chart/%type%/%drug%/%symptom%'
        },

        MESSAGES = {
            'SERVER_ERROR'      : 'Something went awry.',
            'CHART_DATA_ERROR'  : 'Chart data not available.',
            'YES'               : '<strong>Yes</strong>,',
            'NO'                : '<strong>Sorry,</strong> we don’t know if',
            'YES_TEXT'          : 'can cause',
            'NO_TEXT'           : 'causes',
            'INVALID_TERM'      : "We don't know %term%. Did you check your spelling?",
            'INVALID_SEARCH'    : 'Please enter both a Medicine and a Symptom.'
        },

        routeConfig = function ($routeProvider) {
            $routeProvider
                .when('/drug-symptom/:drug/:symptom', {
                    templateUrl: 'app/partials/drug-symptom.html',
                    controller: 'DrugSymptom'
                })
                .when('/not-found/both/:drug/:symptom', {
                    templateUrl: 'app/partials/not-found.html',
                    controller: 'NotFound'
                })
                .when('/not-found/drug/:drug', {
                    templateUrl: 'app/partials/not-found.html',
                    controller: 'NotFound'
                })
                .when('/not-found/symptom/:symptom', {
                    templateUrl: 'app/partials/not-found.html',
                    controller: 'NotFound'
                });
        };

    angular.module('ads18fApp')
        .constant('DATA_PATHS', DATA_PATHS)
        .constant('MESSAGES', MESSAGES)
        .config(['$routeProvider', routeConfig]);
}());