exports.getResultset = function(){ 
    return   {
      hits: {
        total: 0,
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
          ],
          doc_count_error_upper_bound: 0,
          sum_other_doc_count: 0
        }
      },
      took: 3
    }
}