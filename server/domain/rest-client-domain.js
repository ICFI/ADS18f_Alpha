"use strict";

var Promise = require("bluebird");
var Client = require('node-rest-client').Client;
var https = require('https');


//var ElasticSearchQuery = require("./essearch-query-template.js");

var BaseUrl = "https://18f-3263339722.us-east-1.bonsai.io/uscis/_search";

var options_auth={
  mimetypes:{
    json:["application/json","application/json;charset=utf-8"]
  }
};

exports.doRestSearch = executeRestClient;
exports.doHttpSearch = executeHttpClient;

function executeRestClient(url, args) {

  console.log(options_auth);
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
              console.log(JSON.stringify(data));
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
            });

        }catch (e) {
          // reject the promise with caught error
          console.log(e);
          reject(e);
        }
    });
}