/*globals angular */

(function () {
    'use strict';

    var DATA_PATHS = {
            'TYPEAHEAD_DRUG'    : '/api/v1/drug/typeahead/',
            'TYPEAHEAD_SYMPTOM' : '/api/v1/symptom/typeahead/',
            'DRUG_SYMPTOM'      : '/api/v0/medicine/%drug%/%symptom%'
        },
        MESSAGES = {
            'SERVER_ERROR'      : 'Something went awry.'
        };

    angular.module('ads18fApp')
        .constant('DATA_PATHS', DATA_PATHS)
        .constant('MESSAGES', MESSAGES);
}());