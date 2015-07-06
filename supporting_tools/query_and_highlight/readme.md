

Purpose
=======

This directory contains a list of files to support researching the FDA Label API. These scripts queried the API, searching for specific terms, and formatted the results in easy-to-read HTML files. This was created on Day 1 to allow us to understand the data before making any design decisions that could not be implemented.



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
