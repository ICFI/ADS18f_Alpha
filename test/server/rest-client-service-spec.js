var expect = require("chai").expect;
var Promise = require("bluebird"); 

describe("The Open FDA drug label API", function() {
    
    it("should validate that a medicine and symptom have been provided")
    it("should validate that a medicine and symptom have been sanitized before passing to query")
    //highlighting
    //return binary if/not found
    it("should return the spl_medguide to the front end for the first record returned in the result set")
    it("should return a statuscode of 200 for a successful connection")
    it("should return a statuscode of 500 for an unsuccessful connection")
    
});
 
describe("The drug type-ahead API", function() {
    it("should return an alphabetically ordered filtered list of drugs with an exact match based on the letters provided")
    it("should return a statuscode of 200 for a successful connection")
    it("should return a statuscode of 500 for an unsuccessful connection")
});

describe("The symptom type-ahead API", function() {
    it("should return an alphabetically ordered filtered list of symptoms with an exact match based on the letters provided")
    it("should return a statuscode of 200 for a successful connection")
    it("should return a statuscode of 500 for an unsuccessful connection")
});