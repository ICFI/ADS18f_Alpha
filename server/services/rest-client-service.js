"use strict";

var bodyParser = require("body-parser");
//var ElasticSearchQuery = require("../domain/essearch-query-template.js");
var _url = 'api.fda.gov'


module.exports = function(searchProxy, app) {
    app.use(bodyParser.json()); 
    
    app.get('/api/v0/test', function(req, res) {
      res.send({ test: "true" });
    });
    
    app.get('/api/v0/medicine/:medicine/:reaction', function(req, res) {
               var medicine = req.params.medicine;
        res.send({ found: "true", 
                    brand_name: medicine, 
                    generic_name: medicine, 
                    substance_name: medicine,
                    spl_medguide: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare, arcu in molestie ornare, tellus dui consequat urna, in cursus tortor libero at elit. Integer id diam sit amet mauris vulputate ornare. Praesent vel dignissim ligula. Nunc erat orci, volutpat sagittis vehicula ac, venenatis et neque. Curabitur consectetur in nisi vel placerat. Nam a risus lectus. Aliquam condimentum diam et erat dictum condimentum. Nam ornare turpis id pretium rhoncus.</p><p><p>Nam efficitur <span class="highlight">' + medicine + '</span> quis posuere tristique. Vestibulum turpis ante, accumsan eu purus eget, posuere tempor dolor. Fusce sed fringilla enim. Sed tempus tristique varius. Vivamus cursus sed tortor et mattis. Vivamus varius finibus odio condimentum pulvinar. Phasellus vel arcu tincidunt, bibendum erat eu, sodales neque. Fusce rutrum iaculis dolor quis tincidunt.</p><p>Sed facilisis, enim ac convallis rhoncus, elit diam iaculis velit, eget tristique augue enim quis mauris. Fusce sed vehicula diam. Vestibulum enim metus, sodales eget aliquet eu, dapibus id erat. Ut tempor est sed pretium interdum. Nullam vel finibus orci. Etiam eget volutpat orci. Donec vel mauris vel massa eleifend dictum a in neque.</p>'
                    });
    })

    app.get('/api/v0/medicine/typeahead/:medicine?', function(req, res) {
               var medicine = req.params.medicine;
                res.send({collection:[{value:"Oxycodone"},
                                {value:"Oxycontin"},
                                {value:"Oxyfast"},
                                {value:"Oxymetazoline"},
                                {value:"Oxymorphone"}
                                ]})
    })      
  
    app.get('/api/v0/symptom/typeahead/:symptom?', function(req, res) {
               var symptom = req.params.symptom;
                res.send({collection:[{value:"Diaper Rash"},
                                {value:"Diarrhea"},
                                {value:"Difficulty swallowing"},
                                {value:"Diplopia"},
                                {value:"Dizziness"}
                                ]})
    })        
    app.get('/api/v99/drug/label/:medicine/:reaction', function(req, res) {
        var medicine = req.params.medicine;
        var reaction = req.params.reaction;
        //adverse_reactions_table
        //spl_medguide
        var args = '/drug/label.json?search=openfda.brand_name:"'+ medicine +'"+AND+spl_medguide:"' + reaction + '"&limit=100';
        searchProxy.doHttpSearch(_url, args)
        .then(function(collection){
            res.send(collection);
        })
      
    });
}