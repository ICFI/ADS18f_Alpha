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
            'YES'               : 'Yes',
            'NO'                : 'No',
            'YES_TEXT'          : 'can cause',
            'NO_TEXT'           : 'is not known to cause'
        };

    angular.module('ads18fApp')
        .constant('DATA_PATHS', DATA_PATHS)
        .constant('MESSAGES', MESSAGES);
}());