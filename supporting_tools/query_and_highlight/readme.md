

Purpose
=======

This directory contains a list of files to support researching the FDA Label API. These scripts queried the API, searching for specific terms, and formatted the results in easy-to-read HTML files. This was created on Day 1 to allow us to understand the data before making any design decisions that could not be implemented. We queried the API for dangerous drugs like "Oxycontin", special health considerations like "pregnancy", and side effects like "vomiting" to get a sense of the context of the data.



Prerequisites
=============

* Python 3.2
* Run the set\_secrets.bat file to set the appropriate environment variables for URLs, API keys, and passwords


Files
=====
* query\_and\_highlight.bat - Batch file used to call the Python script several times passing in different search criteria
* query\_and\_highlight\_prompt.bat - Batch used to call the Python script for a specific search term typed in at the command prompt
* query\_and\_highlight.py - Python script to call the Label API and format the results in easy-to-read HTML files.

Usage
=====

query\_and\_highlight.bat



Input
=====

* fda_key environment variable



Output
======
* results_<search term>.html - Resulting HTML pages with formatted and highlighted API results
