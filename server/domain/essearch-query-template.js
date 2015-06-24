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
  


        this.sideEffectTypeAhead = {
              "query": {
            
                    "bool": {
            		  "must" : [
            		  				{ "match": {"capitalized_case": "pai"} },
            		  				{ "match": {"_type": "side_effect"} }
            		  			],
            		  "should" : [
            		  				{"prefix" : { "official_name" :  { "value" : "pai", "boost" : 2.0 } }}
            		  			]
            		  	}
            
              },
              "size": 5,
              "fields" : ["capitalized_case"]
            }

}
// class methods
ElasticSearchQuery.prototype.getDrugTypeAhead = function () {
    return this.drugTypeAhead;
};

//deprecated
ElasticSearchQuery.prototype.getSymptomTypeAhead = function () {
    return this.symptomTypeAhead;
};

ElasticSearchQuery.prototype.getSideEffectTypeAhead = function () {
    return this.sideEffectTypeAhead;
};

// export the class
module.exports = ElasticSearchQuery;