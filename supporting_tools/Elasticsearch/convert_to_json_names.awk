BEGIN{
   FS = "\t"
   type = ENVIRON["load_type"]
   index_name = ENVIRON["index"]
   }
   
{

   if (FNR == 1){
      expected = 4
      assert(NF == expected , "Expected " expected " tabbed fields. Did you forget to TSV the file?")
   
      for (i = 1; i <= NF; i++){
         field_name = tolower($i)
         gsub(/[^a-zA-Z0-9]/, "_", field_name)
         fields[i] = trim(field_name)
         }
      field_count = NF   
         
      #for (i = 1; i <= field_count; i++){
      #   print i, fields[i]
      #   }
      }
   else{
      file_set = FNR % 25
      
      # remove any quotes to prevent escape issues
      gsub(/\"/, "", $0)
      gsub(/[^a-zA-Z0-9\$ ,-:_\t\(\)&]/, "_", $0)
   
      print "{\"index\":{\"_index\":\"" index_name  "\", \"_type\":\"" type "\", \"_id\":\"" type "-" FNR "\"}" > "data_" file_set ".json"
      line = "{"
      for (j = 1; j <= field_count; j++){
         line = line "\"" fields[j] "\" : \"" $j "\", "
         
         # check if date
         if ($j ~/^[0-9]+\/[0-9]+\/[0-9]+$/){
            #print "date found: " $j
            month = $j
            day = $j
            year = $j
            
            gsub(/\/.*$/, "", month) # remove everything after the first /
            month = left_pad(month, 2, "0")
            line = line "\"" fields[j] ".date-month\" : \"" month "\", "
            
            gsub(/^[^\/]+\//, "", day) # remove everything before the first /
            gsub(/\/.*$/, "", day)     # remove everything after the remaining /
            day = left_pad(day, 2, "0") 
            line = line "\"" fields[j] ".date-day\" : \"" day "\", "

            gsub(/^.*\//, "", year) # remove everything until the last /
            line = line "\"" fields[j] ".date-year\" : \"" year "\", "
            }
         
         # check if number
         if (($j ~/^[0-9,\$.-]+$/) && ($j != ".") && ($j !~/[0-9]+\.[0-9]+\.]/)){
            number = $j
            gsub(/\$|,/, "", number)
            line = line "\"" fields[j] ".number\" : " number ", "
            }

         # Store data for the dc_title and dc_description later
         if (fields[j] == "partner"){
            partner = $j
            }
         if (fields[j] == "name"){
            name = $j
            }
         if (fields[j] == "address"){
            address = $j
            }
           
         
         }
      # Add the dc_title and dc_description fields
      line = line " \"dc_title\" : \"" partner " - " name "\", \"dc_description\" : \"" address "\", "  
      
      # Add 
      
      # remove the last ", " and replace with an ending 
      gsub(/, $/, "}", line)
      print line > "data_" file_set ".json"
      }
}   
END{

}


function assert(condition, string)
{
    if (! condition) {
        printf("%s:%d: assertion failed: %s\n", FILENAME, FNR, string)
        _assert_exit = 1
        exit 1
    }
}

END {
    if (_assert_exit)
        exit 1
}
