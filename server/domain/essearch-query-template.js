// Constructor
function ElasticSearchQuery() {
  // initialize instance properties

    this.drugTypeAhead = {
              "size": 0,
              "aggs": {
                "autocomplete": {
                  "terms": {
                    "field": "provider_state.raw",
                    "order": {
                      "_term": "asc"
                    },
                    "include": {
                      "pattern": "M.*"
                    },
                    "size" : 30
                  }
                }
              },
              "query": {
                "prefix": {
                  "provider_state.raw": {  "value": "M"    }
                }
              }
            };

    this.symptomTypeAhead = {
              "size": 0,
              "aggs": {
                "autocomplete": {
                  "terms": {
                    "field": "provider_state.raw",
                    "order": {
                      "_term": "asc"
                    },
                    "include": {
                      "pattern": "M.*"
                    },
                    "size" : 30
                  }
                }
              },
              "query": {
                "prefix": {
                  "provider_state.raw": {  "value": "M"    }
                }
              }
            };
  
}

// class methods
ElasticSearchQuery.prototype.getDrugTypeAhead = function () {
    return this.drugTypeAhead;
};

ElasticSearchQuery.prototype.getSymptomTypeAhead = function () {
    return this.symptomTypeAhead;
};

// export the class
module.exports = ElasticSearchQuery;