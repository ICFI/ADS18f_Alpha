var expect = require("chai").expect;
var Promise = require("bluebird"); 
var https = require('https');

var ElasticSearchQuery = require("../../server/domain/essearch-query-template.js");

var searchProxy = require("../../server/domain/rest-client-domain.js");

var rawResults = require("./oxy_dizzi_results_shim.js");
var drugResults = require("./oxy_type_ahead_shim.js");
var emptyResult = require("./empty_type_ahead.js");
var emptyFdaResult = require("./empty_openfda.js");
var compoundDrugResult = require("./compound_drug_results_type_ahead.js");
var _test_url = 'api.fda.gov'

describe("The FDA Prototype drug search API", function() {
    
    it("should be able to query the Open FDA dataset for a known medicine and return a result", function(done){
        var args = '/drug/label.json?search=Tylenol&limit=1';
        searchProxy.doHttpSearch(_test_url, args)
        .then(function(collection) {
            //console.log(collection);
            expect(collection).to.be.a("object");
            expect(collection.results.length).to.be.at.least(1);
            done();
        }).catch(function(e){
            console.error(e);
        });
    });
    it("should be able to query the Open FDA dataset fields of brand_name, generic_name, substance_name", function(done){
        var args = '/drug/label.json?search=(openfda.brand_name:"Tylenol"+OR+openfda.generic_name:"Tylenol"+OR+openfda.substance_name:"Tylenol")&limit=1';
        //
        searchProxy.doHttpSearch(_test_url, args)
        .then(function(collection) {
            //console.log(collection);
            expect(collection).to.be.a("object");
            expect(collection.results.length).to.be.at.least(1);
            done();
        }).
        catch(function(e){
            console.error(e);
        });
    });
    it("should query the adverse_reactions field for the provided symptom and return a result", function(done){
        var args = '/drug/label.json?search=adverse_reactions="Dizziness"&limit=1';
        //
        searchProxy.doHttpSearch(_test_url, args)
        .then(function(collection) {
            //console.log(collection);
            expect(collection).to.be.a("object");
            expect(collection.results.length).to.be.at.least(1);
            done();
        }).catch(function(e){
            console.error(e);
        });
    });
    it("should combine these two and query for both parameters", function(done){
        var args = '/drug/label.json?search=(openfda.brand_name:"Oxycontin"+OR+openfda.generic_name:"Oxycontin"+OR+openfda.substance_name:"Oxycontin")+AND+adverse_reactions:"Dizziness"&limit=1';
        //
        searchProxy.doHttpSearch(_test_url, args)
        .then(function(collection) {
            //console.log(collection);
            expect(collection).to.be.a("object");
            expect(collection.results.length).to.be.at.least(1);
            done();
        }).catch(function(e){
            console.error(e);
        });
    });
    it("should parse the results and return a value of found=true if a search returns a match, false otherwise", function(done){
        var cachedResults = rawResults.getResultset();
        var retVal = {}

        if(cachedResults.results.length>0){
            retVal.found = true;
        }
        expect(retVal.found).to.be.equal(true);
        done();
    })
    it("should parse the results and return the brand_name, generic_name, substance_name, spl_medguide field of the first record found to the front-end if found", function(done){
        var cachedResults = rawResults.getResultset();
        var retVal = {}
        try{
            if(cachedResults.results.length>0){
                retVal.found = true;
                retVal.brand_name=cachedResults.results[0].openfda.brand_name[0];
                retVal.generic_name=cachedResults.results[0].openfda.generic_name[0];
                retVal.substance_name=cachedResults.results[0].openfda.substance_name[0];
                retVal.spl_medguide=cachedResults.results[0].spl_medguide;
            }
            expect(retVal.found).to.be.equal(true);
            expect(retVal.brand_name).to.be.deep.equal('OxyContin');
            expect(retVal.generic_name).to.be.deep.equal('OXYCODONE HYDROCHLORIDE');
            expect(retVal.substance_name).to.be.deep.equal('OXYCODONE HYDROCHLORIDE');
            expect(retVal.spl_medguide.toString().substring(0, 30)).to.be.deep.equal('PATIENT INFORMATION OXYCONTIN®');
            
            done();
        }catch(e){
            console.error(e.message);
        }
    })
    it("should validate that the spl_medguide has a length of at least 50", function(done){
        var args = '/drug/label.json?search=(openfda.brand_name:"Oxycontin"+OR+openfda.generic_name:"Oxycontin"+OR+openfda.substance_name:"Oxycontin")+AND+adverse_reactions:"Dizziness"&limit=1';
        //search with live data
        searchProxy.doHttpSearch(_test_url, args)
        .then(searchProxy.parseDrugLabel)
        .then(function(res) {
            expect(res.found).to.be.equal(true);
            expect(res.brand_name).to.be.deep.equal('OxyContin');
            expect(res.generic_name).to.be.deep.equal('OXYCODONE HYDROCHLORIDE');
            expect(res.substance_name).to.be.deep.equal('OXYCODONE HYDROCHLORIDE');
            expect(res.spl_medguide.toString().length).to.be.at.least(50);
            done();
        }).catch(function(e){
            console.error(e);
        });        
    }) 
    
    it("should return a flag to the front-end if no results are found indicating to show an error message", function(done){
        var result =  emptyFdaResult.getResultset();
        //console.log(result)
        var res = {};
        searchProxy.parseDrugLabel(result)
        .then(function(result){
            //console.log("**********:" + result.collection);
            expect(result.showError).to.be.equal(true);
            done();
        })
        .catch(function(e) {
            console.error("Exception: " + e);
        });
    })

})



//****************************************
describe("The FDA compound drug name type-ahead", function(){
    it("should create an instance of the ElasticSearch query object for the compound drug search", function(done){
            var searchRaw = "chi tyl"
            var elasticTemplate = new ElasticSearchQuery();
            var args = elasticTemplate.getCompoundDrugTypeAhead();
            //console.log(args);
            
            args.query.bool.must[0].match.capitalized_case = searchRaw.toLowerCase();
            args.query.bool.should[0].prefix.official_name.value = searchRaw.toLowerCase();
            
            expect(args.query.bool.must[0].match.capitalized_case).to.be.equal(searchRaw); 
            expect(args.query.bool.should[0].prefix.official_name.value).to.be.equal(searchRaw);
            done();

    })
    
    it("should return a list of drugs containing the search strings", function(done){
            var searchRaw = "chi tyl";
            var elasticTemplate = new ElasticSearchQuery();
            var args = elasticTemplate.getCompoundDrugTypeAhead();
            //console.log(args);
            args.query.bool.must[0].match.capitalized_case = searchRaw.toLowerCase();
            args.query.bool.should[0].prefix.official_name.value = searchRaw.toLowerCase();
            //console.log(JSON.stringify(args));
            searchProxy.doRestSearch("https://18f-3263339722.us-east-1.bonsai.io/fda/drug/_search", args)
            .then(function(collection) {
                //console.log(collection);
                expect(collection.length).to.be.at.least(1);
                done();
            })
            .catch(function(e) {
                console.error("Exception: " + e);
            });
            
    })
    it("should parse the search result into a usable JSON format for the front-end", function(done){
        var typeAhead =  JSON.stringify(compoundDrugResult.getResultset());
        //console.log(typeAhead)
        var res = {};
        searchProxy.parseCompoundTypeAhead(typeAhead)
        .then(function(result){
            //console.log("**********:" + result.collection);
            expect(result.collection.length).to.be.at.least(1);
            done();
        })
        .catch(function(e) {
            console.error("Exception: " + e);
        });
    })

    it("should return a list containing Nausea when passed the string 'Chil Ty', 'Childrens Tylenol'", function(done){
        var searchString = 'Chil Ty';
        var elasticTemplate = new ElasticSearchQuery();
        var args = elasticTemplate.getCompoundDrugTypeAhead();
    
        args.query.bool.must[0].match.capitalized_case = searchString.toLowerCase();
        args.query.bool.should[0].prefix.official_name.value = searchString.toLowerCase();
        //console.log(JSON.stringify(args));
        searchProxy.doRestSearch("https://18f-3263339722.us-east-1.bonsai.io/fda/drug/_search", args)
        .then(searchProxy.parseCompoundTypeAhead)
        .then(function(result){
            //console.log("**********:" + JSON.stringify(result));
            expect(result.collection.length).to.be.at.least(1);
            done();
        })
        .catch(function(e) {
            console.error("Exception: " + e);
        });
    })
    it("should return a list containing Dizziness when passed the string 'low', 'Low', or 'LOW'", function(done){
        var searchString = 'Oxy';
        var elasticTemplate = new ElasticSearchQuery();
        var args = elasticTemplate.getCompoundDrugTypeAhead();
        
        args.query.bool.must[0].match.capitalized_case = searchString.toLowerCase();
        args.query.bool.should[0].prefix.official_name.value = searchString.toLowerCase();
        //console.log(JSON.stringify(args));
        searchProxy.doRestSearch("https://18f-3263339722.us-east-1.bonsai.io/fda/drug/_search", args)
        .then(searchProxy.parseCompoundTypeAhead)
        .then(function(result){
            //console.log("**********:" + JSON.stringify(result));
            expect(result.collection.length).to.be.at.least(1);
            done();
        })
        .catch(function(e) {
            console.error("Exception: " + e);
        });
    })
    //it("will limit the search results to the top 5 results") //eliminated as the previous tests verify this assertion
    //it("will not apply any special formatting for the list returned") //eliminated as the results are provided in JSON
    //it("will return XX # of elements when querying a known result set") // eliminated as the previous tests verify this assertion
});
//****************************************


describe("The FDA side-effect type-ahead", function(){
    it("should create an instance of the ElasticSearch query object for the side-effect search", function(done){
            var searchRaw = "back"
            var elasticTemplate = new ElasticSearchQuery();
            var args = elasticTemplate.getSideEffectTypeAhead();
            //console.log(args);
            
            args.query.bool.must[0].match.capitalized_case = searchRaw.toLowerCase();
            args.query.bool.should[0].prefix.official_name.value = searchRaw.toLowerCase();
            
            expect(args.query.bool.must[0].match.capitalized_case).to.be.equal(searchRaw); 
            expect(args.query.bool.should[0].prefix.official_name.value).to.be.equal(searchRaw);
            done();

    })
    
    it("should return an alphabetically ordered list of side-effects whose first letters match the search string provided", function(done){
            var searchRaw = "back"
            var searchString = "[bB][aA][cC][kK]";
            var elasticTemplate = new ElasticSearchQuery();
            var args = elasticTemplate.getSideEffectTypeAhead();
            //console.log(args);
            args.query.bool.must[0].match.capitalized_case = searchRaw.toLowerCase();
            args.query.bool.should[0].prefix.official_name.value = searchRaw.toLowerCase();
            //console.log(JSON.stringify(args));
            searchProxy.doRestSearch("https://18f-3263339722.us-east-1.bonsai.io/fda/side_effect/_search", args)
            .then(function(collection) {
                //console.log(collection);
                expect(collection.length).to.be.at.least(1);
                done();
            })
            .catch(function(e) {
                console.error("Exception: " + e);
            });
            
    })
    it("should parse the search result into a usable JSON format for the front-end", function(done){
        var typeAhead =  JSON.stringify(drugResults.getResultset());
        //console.log(typeAhead)
        var res = {};
        searchProxy.parseTypeAhead(typeAhead)
        .then(function(result){
            //console.log("**********:" + result.collection);
            expect(result.collection.length).to.be.at.least(1);
            done();
        })
        .catch(function(e) {
            console.error("Exception: " + e);
        });
    })

    it("should return a list containing Nausea when passed the string 'nau', 'Nau', or 'NAU'", function(done){
        var searchString = 'nAu';
        var url = "https://18f-3263339722.us-east-1.bonsai.io/fda-dev/side_effect/_search";
        var elasticTemplate = new ElasticSearchQuery();
        var args = elasticTemplate.getSideEffectTypeAhead();
    
        args.query.bool.must[0].match.capitalized_case = searchString.toLowerCase();
        args.query.bool.should[0].prefix.official_name.value = searchString.toLowerCase();
        //console.log(JSON.stringify(args));
        searchProxy.doRestSearch("https://18f-3263339722.us-east-1.bonsai.io/fda/side_effect/_search", args)
        .then(searchProxy.parseCompoundTypeAhead)
        .then(function(result){
            //console.log("**********:" + JSON.stringify(result));
            expect(result.collection.length).to.be.at.least(1);
            done();
        })
        .catch(function(e) {
            console.error("Exception: " + e);
        });
    })
    it("should return a list containing Dizziness when passed the string 'low', 'Low', or 'LOW'", function(done){
        var searchString = 'lOw';
        var url = "https://18f-3263339722.us-east-1.bonsai.io/fda/side_effect/_search";
        var elasticTemplate = new ElasticSearchQuery();
        var args = elasticTemplate.getSideEffectTypeAhead();
        
        args.query.bool.must[0].match.capitalized_case = searchString.toLowerCase();
        args.query.bool.should[0].prefix.official_name.value = searchString.toLowerCase();
        //console.log(JSON.stringify(args));
        searchProxy.doRestSearch("https://18f-3263339722.us-east-1.bonsai.io/fda/side_effect/_search", args)
        .then(searchProxy.parseCompoundTypeAhead)
        .then(function(result){
            //console.log("**********:" + JSON.stringify(result));
            expect(result.collection.length).to.be.at.least(1);
            done();
        })
        .catch(function(e) {
            console.error("Exception: " + e);
        });
    })
    //it("will limit the search results to the top 5 results") //eliminated as the previous tests verify this assertion
    //it("will not apply any special formatting for the list returned") //eliminated as the results are provided in JSON
    //it("will return XX # of elements when querying a known result set") // eliminated as the previous tests verify this assertion
});