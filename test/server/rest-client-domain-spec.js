var expect = require("chai").expect;
var Promise = require("bluebird"); 
var https = require('https');

var searchData = require("../../server/domain/rest-client-domain.js");

var _test_url = 'api.fda.gov'

describe("The FDA Prototype drug search API", function() {
    
    it("should be able to query the Open FDA dataset for a known medicine and return a result", function(done){
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
    it("should be able to query the Open FDA dataset fields of brand_name, generic_name, substance_name")
    it("should query the spl_medguide field for the provided symptom and return a result")
    it("should combine these two and query for both parameters")
    it("should parse the results and return a value of found=true if a search returns a match, false otherwise")
    it("should parse the results and return the brand_name, generic_name, substance_name, spl_medguide field of the first record found to the front-end if found")
    it("should validate that the spl_medguide has a length of at least 50")

})

describe("The FDA medicine type-ahead", function(){
    it("should create an instance of the ElasticSearch query object for the drug search")
    it("should return an alphabetically ordered list of drugs whose first letters match the search string provided")
    it("should parse the search result into a usable JSON format for the front-end")
    it("should return a list containing Ibuprofen when passed the string 'ibu', 'Ibu', or 'IBU'")
    it("should return a list containing Advil when passed the string 'adv', 'Adv', or 'ADV'")
    it("will limit the search results to the top 5 results")
    it("will not apply any special formatting for the list returned")
    it("will return XX # of elements when querying a known result set")
});

describe("The FDA symptom type-ahead", function(){
    it("should create an instance of the ElasticSearch query object for the symptom search")
    it("should return an alphabetically ordered list of drugs whose first letters match the search string provided")
    it("should parse the search result into a usable JSON format for the front-end")
    it("should return a list containing Nausea when passed the string 'nau', 'Nau', or 'NAU'")
    it("should return a list containing Dizziness when passed the string 'diz', 'Diz', or 'DIZ'")
    it("will limit the search results to the top 5 results")
    it("will not apply any special formatting for the list returned")  
    it("will return XX # of elements when querying a known result set")
});