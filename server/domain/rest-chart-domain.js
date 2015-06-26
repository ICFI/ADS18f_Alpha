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

function percentIncidence(current, total){
    return Number((current/(total-current))*100).toFixed(0);
}
exports.craftDrugInteractionResponse = function(drug, symptom, data){
    return new Promise(function(resolve, reject){
    try{
        /*
        {
          'title': 'Headaches make up 3% of reported adverse effects for Advil',
          'data': [
                  ['Headaches reported': 985],
                  ['All other adverse effects reported': 24000]
                ]
        }
        */
        var chartData = {};
        chartData.title= symptom + ' make(s) up ' + percentIncidence(data.current_drug, data.all_drugs) + '% of reported adverse effects for ' + drug;
        chartData.data=[];
        chartData.data[0] = [symptom + ' reported', data.current_drug];
        chartData.data[1] = ['All other adverse effects reported', data.all_drugs];

        resolve(chartData);
    }
    catch (e) {
      // reject the promise with caught error
      reject(e);
    }
  });  
}

exports.craftInteractionResponse = function(symptom, data){
    return new Promise(function(resolve, reject){
    try{
        /*
        {
          'title': 'Headaches make up 3% of reported adverse effects for Advil',
          'data': [
                  ['Headaches reported': 985],
                  ['All other adverse effects reported': 24000]
                ]
        }
        */
        var chartData = {};
        chartData.title= symptom + ' make(s) up ' + percentIncidence(data.current_drug, data.all_drugs) + '% of all reported adverse effects';
        chartData.data=[];
        chartData.data[0] = [symptom + ' reported', data.current_drug];
        chartData.data[1] = ['All other adverse effects reported', data.all_drugs];

        resolve(chartData);
    }
    catch (e) {
      // reject the promise with caught error
      reject(e);
    }
  });  
}

exports.parseTopFiveChart = function (drug, data){
  
  return new Promise(function(resolve, reject){
    try{
        
        var chartData = {};
        chartData.title="Top 5 most reported side effects from " + drug;
        chartData.columns = [];
        chartData.columns[0]=[];
        chartData.columns[0][0]="Side Effects"
        var n = 0;
        while(n++ < data.results.length){
          chartData.columns[0][n]=data.results[n-1].count;
        }
        //console.log(chartData);
        resolve(chartData);
    }
    catch (e) {
      // reject the promise with caught error
      reject(e);
    }
  });    
}