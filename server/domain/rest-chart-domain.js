"use strict";

var Promise = require("bluebird");


var chartList = [
                        {type:"my_med", comment:"Returns data for the reported frequency that the user-requested medication cause the requested symptom"}, 
                        {type:"any_med", comment:"Returns data for the reported frequency that the *any* medication cause the requested symptom"},
                        {type:"top_five", comment:"Display the top 5 adverse effects for the requested medication.  Used if user-requested symptom is not found in association with the requested med"}
                    ];

exports.getChartList = function(){
        return new Promise(function(resolve, reject) {
        try {
            resolve(chartList);
        }catch (e) {
          // reject the promise with caught error
          console.log(e);
          reject(e);
        }
    });
}

exports.parseChartResults = function(type){
    
}