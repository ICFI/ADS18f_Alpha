// Constructor
function ElasticSearchQuery() {
  // initialize instance properties

    this.drugTypeAhead = {
          "size": 0,
          "aggs": {
            "autocomplete": {
              "terms": {
                "field": "capitalized_case.raw",
                "order": {
                  "_term": "asc"
                },
                "include": {
                          "pattern": "[oO][xX][yY].*"
                },
                "size" : 5
              }
            }
          },
          "query": {

                "bool": {
                  "must" : [
                                { "prefix": {"capitalized_case": {"value": "oxy"}} },
                                { "match" : {"_type" : "drug" }}
                            ]
                }

          }
        };

    this.symptomTypeAhead = {
        "size": 0,
        "aggs": {
            "autocomplete": {
                "terms": {
                    "field": "capitalized_case.raw",
                    "order": {
                        "_term": "asc"
                    },
                    "include": {
                        "pattern": "[bB][aA][cC].*"
                    },
                    "size": 5
                }
            }
        },
        "query": {
            "bool": {
                "must": [
                    {
                        "prefix": {
                            "capitalized_case": {
                                "value": "bac"
                            }
                        }
                    },
                    {
                        "match": {
                            "_type": "side_effect"
                        }
                    }
                ]
            }
        }
    }
  
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