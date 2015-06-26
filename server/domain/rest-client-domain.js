"use strict";

var Promise = require("bluebird");
var Client = require('node-rest-client').Client;
var https = require('https');


var ElasticSearchQuery = require("./essearch-query-template.js");


var BaseUrl = "https://18263339722.us-east-1.bonsai.io/fda/_search";

var options_auth={
    user:process.env.ES_USER,
    password:process.env.ES_PWD,
    mimetypes:{
    json:["application/json","application/json;charset=utf-8"]
  }
};


exports.doRestSearch = executeRestClient;
exports.doHttpSearch = executeHttpClient;
exports.parseDrugLabel = function(resultSet) {
    
    return new Promise(function(resolve, reject) {
        var retVal = {};
        try {
            //console.log("parseDrugLabel:  " + JSON.stringify(resultSet))
            if(!resultSet.error){
                //console.log("parseDrugLabel:  error is NOT undefined")
                if(resultSet.results.length>0){
                    retVal.found = true;
                    retVal.brand_name=resultSet.results[0].openfda.brand_name[0];
                    retVal.generic_name=resultSet.results[0].openfda.generic_name[0];
                    retVal.substance_name=resultSet.results[0].openfda.substance_name[0];
                    retVal.spl_medguide=resultSet.results[0].spl_medguide;
                }else {
                    retVal.found = false;
                } 
                
            }else{
                //console.log("parseDrugLabel:  error is undefined")
                retVal.showError=true;
            }
            resolve(retVal);
        }catch (e) {
              // reject the promise with caught error
              console.log(e);
              reject(e);
        }
    });
}

exports.parseRegExpression = function(val) {
        var retVal = '';
        var i = 0;
        try {
            while(i++<val.length)
            {
                var curLetter = val.substring(i-1, i);
                retVal+='[' + curLetter.toLowerCase() + curLetter.toUpperCase() + ']'
            } 
            return retVal;
        }catch (e) {
            // reject the promise with caught error
            console.log(e);
            return "";
        }
}

exports.parseTypeAhead = function(params){
  return new Promise(function(resolve, reject){
    try{
        var vals = {};
        try{
            vals = JSON.parse(params)
        }catch(e){
            vals = params
        }

        
      //console.log("parseTypeAhead: vals= " + params);
      var lookupVals = vals.aggregations.autocomplete.buckets
      var retVal = {}
      
      retVal.showError=false;
      retVal.collection = [];
      var i =0;
      for(var s in lookupVals){
        retVal.collection[i] = {key: lookupVals[s].key};
        i++;
      }
      if(retVal.collection.length==0){
          retVal.showError=true;
      }
      
      resolve(retVal)
    }
    catch (e) {
      // reject the promise with caught error
      reject(e);
    }
  });
};

exports.parseCompoundTypeAhead = function(params){
  return new Promise(function(resolve, reject){
    try{
        var vals = {};
        try{
            vals = JSON.parse(params)
        }catch(e){
            vals = params
        }

        
      //console.log("parseTypeAhead: vals= " + params);
      var lookupVals = vals.hits.hits
      var retVal = {}
      
      retVal.showError=false;
      retVal.collection = [];
      var i =0;
      for(var s in lookupVals){
        retVal.collection[i] = {key: lookupVals[s].fields.capitalized_case[0]};
        i++;
      }
      if(retVal.collection.length==0){
          retVal.showError=true;
      }
      
      resolve(retVal)
    }
    catch (e) {
      // reject the promise with caught error
      reject(e);
    }
  });
};


function executeRestClient(url, args) {

  var client = new Client(options_auth);
    return new Promise(function(resolve, reject) {
        try {
             var restArgs = {
                data: { },
                headers:{"Content-Type": "application/json"} 
              };
            restArgs.data = args;
            //console.log(JSON.stringify(restArgs));
            client.post(url, restArgs, function(data, response) {
              //console.log("REST-CLIENT-DATA:  " + JSON.stringify(data));
              resolve(data);
            });
         }catch (e) {
          // reject the promise with caught error
          console.log(e);
          reject(e);
        }
    });
  }
  
function executeHttpClient(url, path){
    var options = {
        host: url,
        port: 443,
        path: path,
        headers: { 'Content-Type': 'application/json' }
    };
    return new Promise(function(resolve, reject) {
        try {
            
            var req = https.get(options, function(res) {
                //console.log('STATUS: ' + res.statusCode);
                //console.log('HEADERS: ' + JSON.stringify(res.headers));
                var response_data='';
                res.setEncoding('utf8');
                res.on("data", function(chunk, test){
                    response_data += chunk;
                });
                
                res.on("end", function(data){
                    resolve(JSON.parse(response_data));
                })
            }).end();

        }catch (e) {
          // reject the promise with caught error
          console.log(e);
          reject(e);
        }
    });
}

exports.parseDrugInteractionChart = function (data){
  
  return new Promise(function(resolve, reject){
    try{
        var chartData = {};
        for(var n in data){
          var curData = data[n];
          if(data[n].error){
              if(data[n].error.code == 'NOT_FOUND'){
                  throw 'Service error';
              }
          }
          if(n==0){
            chartData.current_drug = curData.meta.results.total;
          }else{
            chartData.all_drugs = curData.meta.results.total;
          }
        }
        resolve(chartData);
    }
    catch (e) {
      // reject the promise with caught error
      reject(e);
    }
  });    
}



exports.getDrugInteractionChart = function(drug, symptom){
    
    //query - total
    //https://api.fda.gov/drug/event.json? search=patient.drug.openfda.brand_name:oxycontin+AND+patient.reaction.reactionmeddrapt:Constipation&limit=1
    //https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:oxycontin&limit=1
    //base URL:  https://api.fda.gov/drug/event.json
    //iterate 1:  search=patient.drug.openfda.brand_name:oxycontin+AND+patient.reaction.reactionmeddrapt:Constipation&limit=1
    //iterate 2:  search=patient.drug.openfda.brand_name:oxycontin&limit=1
    
        var baseUrl = "api.fda.gov";
        var sIndividual = '/drug/event.json?search=patient.drug.openfda.brand_name:' + encodeURI(drug) + '+AND+patient.reaction.reactionmeddrapt:' + encodeURI(symptom) + '&limit=1';
        var sBaseline = '/drug/event.json?search=patient.drug.openfda.brand_name:' + encodeURI(drug) + '&limit=1';
        var evalList = [
                {query: sIndividual},
                {query: sBaseline}
            ];
        
        console.log(evalList);
       return Promise.map(evalList, function(item){
        
        return new Promise(function(resolve, reject) {
          try {
            executeHttpClient(baseUrl, item.query)
            .then(function(data){
              console.log(data);
              resolve(data);
            })
            }catch (e) {
                // reject the promise with caught error
                console.log(e);
                reject(e);
              }
        })        
      });     
}