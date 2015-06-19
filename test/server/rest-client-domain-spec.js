var expect = require("chai").expect;
var Promise = require("bluebird"); 
var https = require('https');

var searchData = require("../../server/domain/rest-client-domain.js");

var _test_url = 'api.fda.gov'

describe("The FDA Prototype Domain", function() {
    
    it("should be able to read the environment variables for authenticating against the search server", function(done){
        var args = '/drug/label.json?search=Tylenol&limit=1';
        searchData.doHttpSearch(_test_url, args)
        .then(function(collection) {
            //console.log(collection);
            expect(collection).to.be.a("object");
            expect(collection.results.length).to.be.at.least(1);
            done();
        }).catch(function(e){
            console.error(e);
        });
    });

    
})