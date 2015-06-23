exports.getResultset = function(){ 
    return {
      hits: {
        total: 1,
        max_score: 0,
        hits: [
        ]
      },
      _shards: {
        total: 1,
        successful: 1,
        failed: 0
      },
      timed_out: false,
      aggregations: {
        autocomplete: {
          buckets: [
            {
              key: "Low back pain",
              doc_count: 1
            }
          ],
          doc_count_error_upper_bound: 0,
          sum_other_doc_count: 0
        }
      },
      took: 3
    }
}