/*globals angular */

(function () {
    'use strict';

    var doesMedicineCauseReaction = function ($http, $q, DATA_PATHS, MESSAGES) {
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

        typeAhead = function ($http, $q, DATA_PATHS) {
            var formatGetPath = function (params) {
                    var path;

                    switch (params.field) {
                    case 'DRUG':
                        path = DATA_PATHS.TYPEAHEAD_DRUG;
                        break;
                    case 'SYMPTOM':
                        path = DATA_PATHS.TYPEAHEAD_SYMPTOM;
                        break;
                    }

                    return path + params.query;
                },

                formatResponse = function (data) {
                    var response = [];

                    angular.forEach(data, function (item) {
                        response.push(item.key);
                    });

                    return response;
                },

                get = function (params) {
                    var response,
                        deferred;

                    deferred = $q.defer();

                    $http({
                        'method': 'GET',
                        'url'   : formatGetPath(params)
                    }).success(function (data) {
                        deferred.resolve(formatResponse(data));
                    }).error(function () {
                        deferred.resolve([]);
                    });

                    response = deferred.promise;

                    return response;
                };

            return {
                get : get
            };
        },

        getChartData = function ($http, $q, DATA_PATHS, MESSAGES) {
            var formatGetPath = function (params) {
                    return DATA_PATHS.CHART
                           .replace('%type%', params.type)
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
                        if (data.error !== undefined && data.error === true) {
                            deferred.reject(MESSAGES.CHART_DATA_ERROR);
                        } else {
                            deferred.resolve(data);
                        }
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

    angular.module('ads18fApp').factory('doesMedicineCauseReaction', ['$http', '$q', 'DATA_PATHS', 'MESSAGES', doesMedicineCauseReaction])
                               .factory('typeAhead', ['$http', '$q', 'DATA_PATHS', typeAhead])
                               .factory('getChartData', ['$http', '$q', 'DATA_PATHS', 'MESSAGES', getChartData]);
}());