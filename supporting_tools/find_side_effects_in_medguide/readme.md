

Purpose
=======

This directory contains scripts to research the availability of plain language side effects in various FDA Label API fields. As part of our user-centered design approach, we wanted to return information to the user that was easily understood. Because most of the Label API data is unstructured text, little was known about the frequency of specific words across the data.
 
This script searched for various plain language side effects like "itching" and "chest pain" in several of the data fields and returned a count and highlighted reference to provide some context. This allowed our health experts to make an informed decision about which field to use when searching for side effects. While we initially wanted to use the spl\_medguide because it is written in plain language, the adverse\_reations field clearly had the most side effect references.



Prerequisites
=============

* Python 3.2
* Run the set\_secrets.bat file to set the appropriate environment variables for URLs, API keys, and passwords


Files
=====
* find\_effects\_in\_medguide.bat - Batch file used to iteratively call the Python script to search for various side effects in the adverse\_reactions, sp\_medguide, and boxed\_warning API fields
* find\_effects\_in\_medguide.py - Python script to call the Label API and extract the match count and highlight the matching terms within the field
* Term Counts by Field.png - Image of the final analysis of term/field counts that led us to pick adverse\_reactions as the source field for side effect queries.


Usage
=====

find\_effects\_in\_medguide.bat



Input
=====

* fda_key environment variable



Output
======
* results\_<side effect>\_<API field>.html - Result page for the individual side effect/API field combination
* results\_all.html - Combined list of all of resulting HTML pages

