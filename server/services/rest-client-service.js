"use strict";

var bodyParser = require("body-parser");
var ElasticSearchQuery = require("../domain/essearch-query-template.js");
var chartProxy = require("../domain/rest-chart-domain.js");

var _url = 'api.fda.gov'


module.exports = function(searchProxy, app) {
    app.use(bodyParser.json()); 
    

    app.get('/api/v1/drug/label/:medicine/:reaction', function(req, res) {
        var medicine = encodeURI(req.params.medicine);
        var reaction = encodeURI(req.params.reaction);

        var args = '/drug/label.json?search=(openfda.brand_name:"'+ medicine +'"+OR+openfda.generic_name:"'+ medicine +'"+OR+openfda.substance_name:"'+ medicine +'")+AND+adverse_reactions:"' + reaction + '"&limit=1';
        try{
            searchProxy.doHttpSearch(_url, args)
            .then(searchProxy.parseDrugLabel)
            .then(function(collection){
                res.send(collection);
            })
        }catch(e){
            res.send({error:"true", message: e.message})
        };
    });
    
    app.get('/api/v1/sideeffect/typeahead/:symptom?', function(req, res) {
        var symptom = req.params.symptom;
        var elasticTemplate = new ElasticSearchQuery();
        var args = elasticTemplate.getSideEffectTypeAhead();
        
        args.query.bool.must[0].match.capitalized_case = symptom.toLowerCase();
        args.query.bool.should[0].prefix.official_name.value = symptom.toLowerCase();
        //console.log("REST-CLIENT-SERVICE" + JSON.stringify(args));
        searchProxy.doRestSearch("https://18f-3263339722.us-east-1.bonsai.io/fda/side_effect/_search", args)
        .then(searchProxy.parseCompoundTypeAhead)
        .then(function(result){
            res.send(result.collection);
        })
    })
    
    app.get('/api/v1/medicine/typeahead/:medicine?', function(req, res) {
        var medicine = req.params.medicine;
        var elasticTemplate = new ElasticSearchQuery();
        var args = elasticTemplate.getCompoundDrugTypeAhead();
        args.query.bool.must[0].match.capitalized_case = medicine.toLowerCase();
        args.query.bool.should[0].prefix.official_name.value = medicine.toLowerCase();
        //console.log("REST-CLIENT-SERVICE" + JSON.stringify(args));
        searchProxy.doRestSearch("https://18f-3263339722.us-east-1.bonsai.io/fda/drug/_search", args)
        .then(searchProxy.parseCompoundTypeAhead)
        .then(function(result){
            res.send(result.collection);
        })
    })
    
    app.get('/api/v1/chart/:type?/:drug?/:symptom?', function(req, res){
        var chartType=req.params.type;
        if(!chartType)
        {
            chartProxy.getChartList()
            .then(function(result){
                res.send(result);
            })
        }else
        {
            var drug = req.params.drug;
            var symptom = req.params.symptom;
            switch(chartType)
            {
                case 'my_med':
                    try{

                        searchProxy.getDrugInteractionChart(drug, symptom)
                        .then(searchProxy.parseDrugInteractionChart)
                        .then(function(result){
                            chartProxy.craftDrugInteractionResponse(drug, symptom, result)
                            .then(function(result){
                                //console.log(result)
                                res.send(result);      
                            })
                            .catch(function(e){
                               res.send({"error":true, "message":e.message});
                            })
                        })
                        .catch(function(e){
                           res.send({"error":true, "message":e.message});
                        });
                    }catch(e){
                        res.send({"error":true, "message":e.message});
                    }
                    break;
                case 'any_med':
                    try{
                        searchProxy.getInteractionChart(symptom)
                        .then(searchProxy.parseDrugInteractionChart)
                        .then(function(result){
                            chartProxy.craftInteractionResponse(symptom, result)
                            .then(function(result){
                                //console.log(result)
                                res.send(result);      
                            })
                            .catch(function(e){
                               res.send({"error":true, "message":e.message});
                            })
                        })
                        .catch(function(e){
                           res.send({"error":true, "message":e.message});
                        });
                    }catch(e){
                        res.send({"error":true, "message":e.message});
                    }
                    break;       
    
                case 'top_five':
                    var args = '/drug/event.json?search=patient.drug.openfda.brand_name:' + encodeURI(drug) + '&count=patient.reaction.reactionmeddrapt.exact&limit=5';
                    //search with live data
                    searchProxy.doHttpSearch(_url, args)
                    .then(function(result) {
                        chartProxy.parseTopFiveChart(drug, result)
                        .then(function(result){
                            res.send(result);             
                        }).catch(function(e){
                            console.error(e);
                        });
                    }).catch(function(e){
                        console.error(e);
                    });  
                    break;
                default:
                    res.send("IN PROGRESS")
            }
        }
    });

}