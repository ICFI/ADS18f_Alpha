function debug_log(grouping_text, message, logging_on){
   if (logging_on == "Y"){
      log_message = "DEBUG\t" strftime("%Y-%m-%d\t%H:%M:%S\t") grouping_text "\t" message
      print log_message
      }
   return   
   }



function left_pad(original_text, total_length, pad_char){
   debug_log("Left Pad", "original_text=" original_text, logging_on)
   debug_log("Left Pad", "total_length=" total_length, logging_on)
   debug_log("Left Pad", "pad_char=" pad_char, logging_on)

   pad_text = ""
   len_diff = total_length - length(original_text)
   if (len_diff > 0) {
      for (i = 1; i <= len_diff; ++i){
         pad_text = pad_text pad_char
         }
      }

   new_text = pad_text original_text 
   return new_text   
   }


function right_pad(original_text, total_length, pad_char){
   debug_log("Right Pad", "original_text=" original_text, logging_on)
   debug_log("Right Pad", "total_length=" total_length, logging_on)
   debug_log("Right Pad", "pad_char=" pad_char, logging_on)

   pad_text = ""
   len_diff = total_length - length(original_text)
   if (len_diff > 0) {
      for (i = 1; i <= len_diff; ++i){
         pad_text = pad_text pad_char
         }
      }

   new_text = original_text pad_text 

   return new_text   
   }



function extract_text(original_text, start_search_text, end_search_text){
   debug_log("Extract Text", "original_text =" original_text, logging_on)
   debug_log("Extract Text", "start_search_text =" start_search_text, logging_on)
   debug_log("Extract Text", "end_search_text =" end_search_text, logging_on)
   
   begin_loc = match(original_text, start_search_text)
   debug_log("Extract Text", "begin_loc =" begin_loc, logging_on)
   if (begin_loc == 0){
      # -1 is start_search_text not found
      return "-1\t"
      }
   debug_log("Extract Text", "begin_ RSTART =" RSTART, logging_on)
   debug_log("Extract Text", "begin_ RLENGTH =" RLENGTH, logging_on)
   
   begin_length = RLENGTH
   
   
   remaining_text = substr(original_text, begin_loc + RLENGTH, length(original_text) - begin_loc)
   debug_log("Extract Text", "remaining_text =" remaining_text, logging_on)
   
   end_loc = match(remaining_text, end_search_text)
   debug_log("Extract Text", "end_loc =" end_loc, logging_on)
   
   if (end_loc <= 0){
      # -2 is end_search_text not found
      return "-2\t"
      }     
   debug_log("Extract Text", "end_loc =" end_loc "+" begin_loc "+" begin_length "- 1", logging_on)
   end_loc = end_loc + begin_loc + begin_length - 1
   debug_log("Extract Text", "end_loc =" end_loc, logging_on)
      

   extracted_text = "0\t" substr(original_text, begin_loc + begin_length, end_loc - begin_loc - begin_length)
   debug_log("Extract Text", "extracted_text =" extracted_text, logging_on)
   debug_log("Extract Text", " ", logging_on)

   
   return extracted_text
   }
   
function calculate_seconds(time){
   # The time must be in HH:MM:SS format
   hours    = substr(time, 1, 2)
   minutes  = substr(time, 4, 2)
   seconds  = substr(time, 7, 2)
   
   total_seconds  = seconds + (minutes * 60) + (hours * 60 * 60)
   total_minutes  = (seconds / 60) + minutes + (hours * 60)
   total_hours = (seconds / (60 * 60)) + (minutes / 60) + hours
   
   return total_seconds "\t" total_minutes "\t" total_hours
   }
   
   
# Left trim the given characters from the beginning of a string
function ltrim(text_to_be_trimmed, trim_char){
   # Default trim_char to space if not value
   if (trim_char == ""){
      trim_char = " "
      }
   trimmed_text = text_to_be_trimmed
   # Replace the expression Line Start + any # of trim characters with "" to remove beginning spaces
   find_exp = "\^" trim_char "+"
   sub(find_exp, "", trimmed_text)

   return trimmed_text
   }

   
# Right trim the given characters from the end of a string
function rtrim(text_to_be_trimmed, trim_char){
   # Default trim_char to space if not value
   if (trim_char == ""){
      trim_char = " "
      }
   trimmed_text = text_to_be_trimmed
   # Replace the expression any # of trim characters + end of line with "" to remove beginning spaces
   find_exp = trim_char "+\$"
   sub(find_exp, "", trimmed_text)

   return trimmed_text
   }
   
# Left and right trim the given characters from the string
function trim(text_to_be_trimmed, trim_char){
   trimmed_text = ltrim(text_to_be_trimmed, trim_char)
   trimmed_text = rtrim(trimmed_text, trim_char)

   return trimmed_text
   }
   
   
# Parse the directory from a path reference  
function parse_path(path){
   dir  = ""
   # path does not contain any \'s so it must just include the drive letter and colon
   if (path !~/\\/ && path ~/:/){
      dir = substr(path, 1, 2)   
      }
   # path does not contain : or \ so it must just be a filename reference
   else if(path !~/\\/ && path !~/:/){
      return ""
      }
   # path does contain \'s so get the string up until the last \
   else{
      test = match(path, /^.+\\/)
      dir   = substr(path, RSTART, RLENGTH)
      debug_log("parse_path", "RSTART=" RSTART " RLENGTH=" RLENGTH " directory=" dir , logging_on) 
      }
   return dir
   }  
   
   
# Parse the filename from a path reference   
function parse_filename(path){
   filename  = ""
   # path does not contain any \'s so it must just include the drive letter and colon
   if (path !~/\\/ && path ~/:/){
      filename = substr(path, 3, length(path) - 2) 
      }
   # path does not contain : or \ so it must just be a filename reference
   else if(path !~/\\/ && path !~/:/){
      filename = path
      return filename
      }
   # path does contain \'s so get the string up until the last \
   else{
      test  = match(path, /^.+\\/)
      dir      = substr(path, RSTART, RLENGTH)
      filename = substr(path, RSTART + RLENGTH, length(path) - (RSTART + RLENGTH) + 1)
      debug_log("parse_path", "RSTART=" RSTART " RLENGTH=" RLENGTH " directory=" dir , logging_on) 
      }
   return filename
   }  
   
   
   
# Read a distrib sales file format and parse into variables
function read_distrib_row(row_type){
   LEN_SALES_SOURCE_CODE      =  8
   LEN_SALES_CUSTOMER_NUM     =  30
   LEN_SELLING_COMPANY_CODE      =  10
   LEN_ATTENTION_NAME         =  50
   LEN_ATTENTION_PHONE        =  30
   LEN_PRODUCT_CODE_SOURCE    =  10
   LEN_PRODUCT_CODE        =  30
   LEN_COMPANY_NAME        =  40
   LEN_ORDER_NUM           =  20
   LEN_SHIP_DATE           =  8
   LEN_ORDER_PLACER_NAME      =  50
   LEN_ORDER_PLACER_PHONE     =  30
   LEN_ADDRESS_LINE_1         =  40
   LEN_ADDRESS_LINE_2         =  40
   LEN_ADDRESS_LINE_3         =  40
   LEN_ADDRESS_LINE_4         =  40
   LEN_CITY             =  40
   LEN_STATE               =  10
   LEN_ZIP_FIRST_5         =  5
   LEN_ZIP_LAST_4          =  5
   LEN_COUNTRY_CODE        =  10
   LEN_ELECTRONIC_ADDRESS_FLAG   =  1
   LEN_ELECTRONIC_ADDRESS     =  100
   LEN_SALES_LANGUAGE         =  10
   LEN_RESERVED_FOR_FUTURE_USE   =  44

   if (row_type == "fixed"){
      row_start_pos     = 1
      col            = LEN_SALES_SOURCE_CODE
      sales_source_code    = trim(substr($0, row_start_pos, col))
      
      row_start_pos     += col
      col            = LEN_SALES_CUSTOMER_NUM 
      sales_customer_num   = trim(substr($0, row_start_pos, col))
      
      row_start_pos     += col
      col            = LEN_SELLING_COMPANY_CODE 
      selling_company_code= trim(substr($0, row_start_pos, col))
      
      row_start_pos     += col
      col            = LEN_ATTENTION_NAME 
      attention_name       = trim(substr($0, row_start_pos, col))
   
      row_start_pos     += col
      col            = LEN_ATTENTION_PHONE 
      attention_phone      = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_PRODUCT_CODE_SOURCE 
      product_code_source = trim(substr($0, row_start_pos, col))
      
      row_start_pos     += col
      col            = LEN_PRODUCT_CODE 
      product_code      = trim(substr($0, row_start_pos, col))
   
      row_start_pos     += col
      col            = LEN_COMPANY_NAME 
      company_name      = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_ORDER_NUM 
      order_num= trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_SHIP_DATE 
      ship_date         = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_ORDER_PLACER_NAME 
      order_placer_name = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_ORDER_PLACER_PHONE 
      order_placer_phone   = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_ADDRESS_LINE_1 
      address_line_1    = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_ADDRESS_LINE_2 
      address_line_2    = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_ADDRESS_LINE_3 
      address_line_3    = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_ADDRESS_LINE_4 
      address_line_4    = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_CITY 
      city           = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_STATE 
      state       = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_ZIP_FIRST_5 
      zip_first_5    = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_ZIP_LAST_4 
      zip_last_4     = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_COUNTRY_CODE 
      country_code      = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_ELECTRONIC_ADDRESS_FLAG 
      electronic_address_flag= trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_ELECTRONIC_ADDRESS 
      electronic_address   = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_SALES_LANGUAGE
      sales_language    = trim(substr($0, row_start_pos, col))

      row_start_pos     += col
      col            = LEN_RESERVED_FOR_FUTURE_USE 
      reserved_for_future_use= trim(substr($0, row_start_pos, col))

      }
   else if (row_type == "delimited"){
      if ($0 !~FS){
         return - 1
         }
         
      sales_source_code    =  trim($1 )
      sales_customer_num      =  trim($2 )
      selling_company_code =  trim($3 )
      attention_name       =  trim($4 )
      attention_phone      =  trim($5 )
      product_code_source     =  trim($6 )
      product_code         =  trim($7 )
      company_name         =  trim($8 )
      order_num            =  trim($9 )
      ship_date            =  trim($10 )
      order_placer_name    =  trim($11 )
      order_placer_phone      =  trim($12 )
      address_line_1       =  trim($13 )
      address_line_2       =  trim($14 )
      address_line_3       =  trim($15 )
      address_line_4       =  trim($16 )
      city              =  trim($17 )
      state          =  trim($18 )
      zip_first_5       =  trim($19 )
      zip_last_4        =  trim($20 )
      country_code         =  trim($21 )
      electronic_address_flag =  trim($22 )
      electronic_address      =  trim($23 )
      sales_language       =  trim($24 )
      reserved_for_future_use =  trim($25 )

      }
   else{
      return 0
      }


   distrib_sales_ssc[sales_source_code] = distrib_sales_ssc[sales_source_code] + 1
   distrib_sales_pcs_pc[product_code_source "\t" product_code] = distrib_sales_pcs_pc[product_code_source "\t" product_code] + 1
   
   return 1

   }


# Write distrib row
function write_distrib_row(row_type, distrib_output_filename){
   distrib_line = return_distrib_row(row_type)

   if (distrib_line != ""){
      # Print the line to the screen or output filename     
      if (distrib_output_filename == ""){
         print distrib_line
         }
      else{
         print distrib_line  > distrib_output_filename      
         }
      
      return 1 
   }
   return 0
}

# Returns distrib row (fixed or delimited or empty)
function return_distrib_row(row_type){

   LEN_SALES_SOURCE_CODE      =  8
   LEN_SALES_CUSTOMER_NUM     =  30
   LEN_SELLING_COMPANY_CODE      =  10
   LEN_ATTENTION_NAME         =  50
   LEN_ATTENTION_PHONE        =  30
   LEN_PRODUCT_CODE_SOURCE    =  10
   LEN_PRODUCT_CODE        =  30
   LEN_COMPANY_NAME        =  40
   LEN_ORDER_NUM           =  20
   LEN_SHIP_DATE           =  8
   LEN_ORDER_PLACER_NAME      =  50
   LEN_ORDER_PLACER_PHONE     =  30
   LEN_ADDRESS_LINE_1         =  40
   LEN_ADDRESS_LINE_2         =  40
   LEN_ADDRESS_LINE_3         =  40
   LEN_ADDRESS_LINE_4         =  40
   LEN_CITY             =  40
   LEN_STATE               =  10
   LEN_ZIP_FIRST_5         =  5
   LEN_ZIP_LAST_4          =  5
   LEN_COUNTRY_CODE        =  10
   LEN_ELECTRONIC_ADDRESS_FLAG   =  1
   LEN_ELECTRONIC_ADDRESS     =  100
   LEN_SALES_LANGUAGE         =  10
   LEN_RESERVED_FOR_FUTURE_USE   =  44

   # Create the line of text to print
   if (row_type == "fixed"){
      sales_source_code       = right_pad( sales_source_code, LEN_SALES_SOURCE_CODE ," ")
      sales_customer_num      = right_pad( sales_customer_num, LEN_SALES_CUSTOMER_NUM ," ")
      selling_company_code    = right_pad( selling_company_code, LEN_SELLING_COMPANY_CODE ," ")
      attention_name       = right_pad( attention_name, LEN_ATTENTION_NAME ," ")
      attention_phone      = right_pad( attention_phone, LEN_ATTENTION_PHONE ," ")
      product_code_source  = right_pad( product_code_source, LEN_PRODUCT_CODE_SOURCE ," ")
      product_code         = right_pad( product_code, LEN_PRODUCT_CODE ," ")
      company_name         = right_pad( company_name, LEN_COMPANY_NAME ," ")
      order_num         = right_pad( order_num, LEN_ORDER_NUM ," ")
      ship_date         = right_pad( ship_date, LEN_SHIP_DATE ," ")
      order_placer_name       = right_pad( order_placer_name, LEN_ORDER_PLACER_NAME ," ")
      order_placer_phone      = right_pad( order_placer_phone, LEN_ORDER_PLACER_PHONE ," ")
      address_line_1       = right_pad( address_line_1, LEN_ADDRESS_LINE_1 ," ")
      address_line_2       = right_pad( address_line_2, LEN_ADDRESS_LINE_2 ," ")
      address_line_3       = right_pad( address_line_3, LEN_ADDRESS_LINE_3 ," ")
      address_line_4       = right_pad( address_line_4, LEN_ADDRESS_LINE_4 ," ")
      city           = right_pad( city, LEN_CITY ," ")
      state             = right_pad( state, LEN_STATE ," ")
      zip_first_5          = right_pad( zip_first_5, LEN_ZIP_FIRST_5 ," ")
      zip_last_4        = right_pad( zip_last_4, LEN_ZIP_LAST_4 ," ")
      country_code         = right_pad( country_code, LEN_COUNTRY_CODE ," ")
      electronic_address_flag    = right_pad( electronic_address_flag, LEN_ELECTRONIC_ADDRESS_FLAG ," ")
      electronic_address      = right_pad( electronic_address, LEN_ELECTRONIC_ADDRESS ," ")
      sales_language       = right_pad( sales_language, LEN_SALES_LANGUAGE ," ")
      reserved_for_future_use    = right_pad( reserved_for_future_use, LEN_RESERVED_FOR_FUTURE_USE ," ")

      distrib_line = sales_source_code sales_customer_num selling_company_code attention_name attention_phone product_code_source product_code company_name order_num ship_date order_placer_name order_placer_phone address_line_1 address_line_2 address_line_3 address_line_4 city state zip_first_5 zip_last_4 country_code electronic_address_flag electronic_address sales_language reserved_for_future_use
      return distrib_line
      }
   else if (row_type == "delimited"){
      distrib_line = sales_source_code FS sales_customer_num FS selling_company_code FS attention_name FS attention_phone FS product_code_source FS product_code FS company_name FS order_num FS ship_date FS order_placer_name FS order_placer_phone FS address_line_1 FS address_line_2 FS address_line_3 FS address_line_4 FS city FS state FS zip_first_5 FS zip_last_4 FS country_code FS electronic_address_flag FS electronic_address FS sales_language FS reserved_for_future_use 
      return distrib_line  
      }
   else {
      return ""
      }
}
   

# Read an individual field token from the distrib file
function read_distrib_token(distrib_token){  
   row_start_pos     += col
   col            = distrib_token 
   return trim(substr($0, row_start_pos, col))
   }
   
   
   
# Return a string with today's date in YYYY-MM-DD format
function today(format){
   if (format == ""){
      format = "%Y-%m-%d"
      }
   else{
      format = convert_date_format_string(format)
      }
   return strftime(format)
   }
   
   
# Return a string with the current time using colons or not 
function now(colons, format){
   if (format == ""){
      format = "%H" colons "%M" colons "%S"
      }
   else{
      format = convert_date_format_string(format)
      }
      
   return strftime(format)
   }  
   

# Convert standard MS Windows date format string (mmmm dd, yyyy) to the AWK format (%B %d, %Y)  
function convert_date_format_string(format){
   format_index = 1

   format_conversion[format_index] = "mmmm,%B"
   format_index++
   format_conversion[format_index] = "mmm,%b"
   format_index++
   format_conversion[format_index] = "mm,%m"
   format_index++
   format_conversion[format_index] = "dddd,%A"
   format_index++
   format_conversion[format_index] = "ddd,%a"
   format_index++
   format_conversion[format_index] = "dd,%d"
   format_index++
   format_conversion[format_index] = "yyyy,%Y"
   format_index++
   format_conversion[format_index] = "yy,%y"
   format_index++
   format_conversion[format_index] = "hh24,%H"
   format_index++
   format_conversion[format_index] = "hh,%I"
   format_index++
   format_conversion[format_index] = "mi,%M"
   format_index++
   format_conversion[format_index] = "ss,%S" 
   format_index++
   format_conversion[format_index] = "AM,%p" 
   
   for (cur_date_format = 1; cur_date_format <= format_index; cur_date_format++){
      array_value = format_conversion[cur_date_format]
      split(array_value, replace_array, ",")
      find  = replace_array[1]
      replace = replace_array[2]
      
      gsub(find, replace, format)
      }
   
   return format
   }
   
   
function day_of_week(date){
   debug_log("day_of_week", "date=" date, logging_on)
   
   num_args = split(date, date_arr, "/")
   if (num_args != 3) return "ERROR"
   
   year = date_arr[3] % 100
   century = int(date_arr[3]/100)

   debug_log("day_of_week", "century=" century ", year=" year, logging_on)
   
   a=(date_arr[1] * 13 - 1 /5)
   b=(year/4)
   c=(century/4)
   d=int(a+b+c+date_arr[2]+year-(century*2))
   dayofweek=(date_arr[2] + int((13 * date_arr[1] - 27)/5) + date_arr[3] + int(date_arr[3]/4) - int(date_arr[3]/100) + int(date_arr[3]/400))%7

   if (dayofweek==0) return "Sunday"
   else if (dayofweek==1) return "Monday"
   else if (dayofweek==2) return "Tuesday"
   else if (dayofweek==3) return "Wednesday"
   else if (dayofweek==4) return "Thursday"
   else if (dayofweek==5) return "Friday"
   else if (dayofweek==6) return "Saturday"
}

function date_is_less_than(date1, date2){
   # dates MUST be in the form mm/dd/yyyy
   # returns 1 if date1 < date2
   # returns 0 if date1 > date2
   # retrusn -1 if error occurs
   debug_log("date_is_less_than", "date1=" date1, logging_on)
   debug_log("date_is_less_than", "date2=" date2, logging_on)
   
   num_args = split(date1, date1_arr, "/")
   if (num_args != 3) return "ERROR"
   
   num_args = split(date2, date2_arr, "/")
   if (num_args != 3) return "ERROR"
   
   # compare years...
   if (date1_arr[3] < date2_arr[3]) {
      debug_log("date_is_less_than", date1 " is less than " date2, logging_on)
      return "Y"
   }
   else if (date1_arr[3] > date2_arr[3]) {
      debug_log("date_is_less_than", date1 " is NOT less than " date2, logging_on)
      return "N"
   }
   else { #date1_arr[3] == date2_arr[3]
      # years are the same, compare months
      if (date1_arr[1] < date2_arr[1]) {
         debug_log("date_is_less_than", date1 " is less than " date2, logging_on)
         return "Y"
      }
      else if(date1_arr[1] > date2_arr[1]){
         debug_log("date_is_less_than", date1 " is NOT less than " date2, logging_on)
         return "N"
      }
      else { #date1_arr[1] == date2_arr[1]
         # year and month are the same, compare day
         if(date1_arr[2] < date2_arr[2]) {
            debug_log("date_is_less_than", date1 " is less than " date2, logging_on)
            return "Y"
         }
         else if(date1_arr[2] >= date2_arr[2]) {
            debug_log("date_is_less_than", date1 " is NOT less than " date2, logging_on)
            return "N"
         }
      }
   }
}
   
   

# Add commas as thousands separators to numbers
function add_comma(n  , s) {
   s = (ThouSep ? ThouSep : ",") "&"  # US convention the default
      while ( n ~ /^ *[-+(]? *[0-9][0-9][0-9][0-9]/ )
         sub ( /[0-9][0-9][0-9]([^0-9].*|$)/, s, n )
      return n
   }
   
   
# Count occurrences of a pattern 
function count_occurrences(find_pattern, text){
   debug_log("count_occurrences", "Start", logging_on)
         
   found_count    = 0
   remaining_text    = text
            
   do{
      found_index = match(remaining_text, find_pattern)
      if (found_index > 0){
         debug_log("count_occurrences", "Found '" find_pattern "' in '" remaining_text "' at " RSTART " for " RLENGTH " chars.", logging_on)
         found_count++
         end_index    = RSTART + RLENGTH
         remaining_length = length(remaining_text) - end_index + 1
         remaining_text     = substr(remaining_text, end_index, remaining_length)
         }
      } while (found_index > 0)
      
   return found_count
   }



function return_pattern_match(search_text, pattern){
   if (search_text == ""){ return ""}
   match(search_text, pattern)
   return substr(search_text, RSTART, RLENGTH)
   }
   
function percentage(decimal){
   return int((decimal * 100))
   }
   
function extract_text_string(original_text, start_search_text, end_search_text){
   debug_log("Extract Text", "original_text =" original_text, logging_on)
   debug_log("Extract Text", "start_search_text =" start_search_text, logging_on)
   debug_log("Extract Text", "end_search_text =" end_search_text, logging_on)
   
   begin_loc = match(original_text, start_search_text)
   debug_log("Extract Text", "begin_loc =" begin_loc, logging_on)
   if (begin_loc == 0){
      # -1 is start_search_text not found
      return "-1\t"
      }
   debug_log("Extract Text", "begin_ RSTART =" RSTART, logging_on)
   debug_log("Extract Text", "begin_ RLENGTH =" RLENGTH, logging_on)
   
   begin_length = RLENGTH
   
   
   remaining_text = substr(original_text, begin_loc + RLENGTH, length(original_text) - begin_loc)
   debug_log("Extract Text", "remaining_text =" remaining_text, logging_on)
   
   end_loc = match(remaining_text, end_search_text)
   debug_log("Extract Text", "end_loc =" end_loc, logging_on)
   
   if (end_loc <= 0){
      # -2 is end_search_text not found
      return "-2\t"
      }     
   debug_log("Extract Text", "end_loc =" end_loc "+" begin_loc "+" begin_length "- 1", logging_on)
   end_loc = end_loc + begin_loc + begin_length - 1
   debug_log("Extract Text", "end_loc =" end_loc, logging_on)
      

   extracted_text = substr(original_text, begin_loc + begin_length, end_loc - begin_loc - begin_length)
   debug_log("Extract Text", "extracted_text =" extracted_text, logging_on)
   debug_log("Extract Text", " ", logging_on)

   
   return extracted_text
   }
      