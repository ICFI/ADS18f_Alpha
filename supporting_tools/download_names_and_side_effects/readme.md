

Purpose
=======

This directory contains a list of files to support downloading data required for the medicine and side effect autocompletes. This data was loaded into our own Elasticsearch instance into a ngram field. This provides great flexibility in helping the user find the desired data. A user could type "tyl chi" and see "Childrens Tylenol" returned in the autocomplete.

The list of medicine names was retrieved from the FDA Label API's openfda.brand\_name and openfda.generic\_name. This would allow the user to autocomplete "Advil" or "Ibuprofen." The python script documents some of the challenges in retrieving a unique list of drug names using the API.

The list of side effects was developed by one of our health experts and recorded in an spreadsheet. Originally, we intended to extract a complete list of possible side effects from the adverse\_reactions\_table using the FDA Label API. But, the table structure and data was not consistent. So, we manually developed the list based on common side effects listed in plain language.



Prerequisites
=============

* Python 3.2
* Run the set\_secrets.bat file to set the appropriate environment variables for URLs, API keys, and passwords


Files
=====
get\_brand\_names.py - Python script to call the FDA Label API to get drug names


Usage
=====

python get\_brand\_names.py



Input
=====

* fda_key environment variable



Output
======
* terms\_brand\_names.txt - Text file with each brand name and number of occurrences in the data set separated by a tab. Names are case-sensitive and are duplicated when the cases differ.
* terms\_generic\_names.txt - Text file with each generic name and number of occurrences in the data set separated by a tab. Names are case-sensitive and are duplicated when the cases differ.
