/*globals angular */

(function () {
    'use strict';

    var doesDrugCauseSymptom = function ($http, $q, DATA_PATHS, MESSAGES) {
            var formatGetPath = function (params) {
                    return DATA_PATHS.DRUG_SYMPTOM
                           .replace('%drug%', params.drug)
                           .replace('%symptom%', params.symptom);
                },

                get = function (params) {
                    var response,
                        deferred;

                    deferred = $q.defer();

                    $http({
                        'method': 'GET',
                        'url'   : formatGetPath(params)
                    }).success(function (data) {
                        deferred.resolve(data);
                    }).error(function () {
                        deferred.reject(MESSAGES.SERVER_ERRROR);
                    });

                    response = deferred.promise;

                    return response;
                };

            return {
                get : get
            };
        },

        typeAhead = function ($http, $q, DATA_PATHS, MESSAGES) {
            var formatGetPath = function (params) {
                    return DATA_PATHS.DRUG_SYMPTOM
                           .replace('%drug%', params.drug)
                           .replace('%symptom%', params.symptom);
                },

                get = function (params) {
                    var response,
                        deferred;

                    deferred = $q.defer();

                    $http({
                        'method': 'GET',
                        'url'   : formatGetPath(params)
                    }).success(function (data) {
                        deferred.resolve(data);
                    }).error(function () {
                        deferred.reject(MESSAGES.SERVER_ERRROR);
                    });

                    response = deferred.promise;

                    return response;
                };

            return {
                get : get
            };
        };

    angular.module('ads18fApp').factory('doesDrugCauseSymptom', ['$http', '$q', 'DATA_PATHS', 'MESSAGES', doesDrugCauseSymptom])
                               .factory('typeAhead', ['$http', '$q', 'DATA_PATHS', 'MESSAGES', typeAhead]);
}());