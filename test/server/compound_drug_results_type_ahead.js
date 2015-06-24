exports.getResultset = function(){ 
    return   {
      hits: {
        total: 73,
        max_score: 3.8554504000000001,
        hits: [
          {
            _type: "drug",
            _index: "fda_dev",
            _id: "drug-1704",
           fields: {
              capitalized_case: [
                "Childrens Tylenol"
              ]
            },
            _score: 3.8554504000000001
          },
          {
            _type: "drug",
            _index: "fda_dev",
            _id: "drug-1703",
            fields: {
              capitalized_case: [
                "Childrens Tylenol"
              ]
            },
            _score: 3.8554504000000001
          },
          {
            _type: "drug",
            _index: "fda_dev",
            _id: "drug-8775",
            fields: {
              capitalized_case: [
                "Tylenol"
              ]
            },
            _score: 1.7790524999999999
          },
          {
            _type: "drug",
            _index: "fda_dev",
            _id: "drug-4196",
            fields: {
              capitalized_case: [
                "Infants Tylenol"
              ]
            },
            _score: 1.1379305
          },
          {
            _type: "drug",
            _index: "fda_dev",
            _id: "drug-8780",
            fields: {
              capitalized_case: [
                "Tylenol Cold Multi-Symptom"
              ]
            },
            _score: 0.92422320000000002
          }
        ]
      },
      _shards: {
        total: 1,
        successful: 1,
        failed: 0
      },
      timed_out: false,
      took: 1
    }
}