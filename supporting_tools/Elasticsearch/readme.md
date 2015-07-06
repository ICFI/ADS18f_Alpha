

Purpose
=======

This directory contains a list of files to support loading the medicine and side effect data into Elasticsearch and testing possible autocomplete queries. There are sets of batch files and AWK scripts to load the names and side effects into the "fda" or "fda_dev" index.



Prerequisites
=============

* Python 3.2
* Run the set\_secrets.bat file to set the appropriate environment variables for URLs, API keys, and passwords


Files
=====
* awk\_lib.awk - Library of useful AWK helper functions
* convert\_to\_json\_names.awk - AWK script to convert medicine name tab delimited data into the Elasticsearch bulk format
* convert\_to\_json\_side.awk - AWK script to convert side effect tab-delimited data into the Elasticsearch bulk format
* convert\_to\_json\_names.bat - Batch file to load medicine name tab-delimited data into an Elasticsearch indexed named "fda"
* convert\_to\_json\_side.bat - Batch file to load side effect tab-delimited data into an Elasticsearch indexed named "fda"
* convert\_to\_json\_names\_dev.bat - Batch file to load medicine name tab-delimited data into an Elasticsearch indexed named "fda_dev"
* convert\_to\_json\_side\_dev.bat - Batch file to load side effect tab-delimited data into an Elasticsearch indexed named "fda_dev"


Usage
=====

convert\_to\_json\_names.bat




Input
=====

* elastic\_search\_url environment variable
* full\_name\_list.txt - Text file with each brand name and number of occurrences in the data set separated by a tab. 
* full\_side\_effects.txt - Text file with each generic name and number of occurrences in the data set separated by a tab. 



Output
======
* Data loaded directly into Elasticsearch
* data_#.json - Files in the Elasticsearch bulk format used to load the medicine or side effect data. The data is split into multiple files to work around Elasticsearch bulk limits.
