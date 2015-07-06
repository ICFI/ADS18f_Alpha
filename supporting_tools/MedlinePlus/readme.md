

Purpose
=======

This directory contains a list of files to support researching a connection from the FDA Label API to [MedlinePlus](http://www.nlm.nih.gov/medlineplus/medlineplus.html), the NIH National Library of Medicine's online web guide that provides "information about diseases, conditions, and wellness issues in language you can understand." Our health experts on the team were already familiar with the great, simple information about drugs in MedlinePlus and were anxious to connect our MedCheck tool to its data. While we were able to figure out the logic and API calls behind this connection, we focused on improving the quality of the previous build in the remaining time instead of officially implementing this new feature.


MedlinePlus is a collection of structured web pages with detailed information about drugs. While it does provide an API, that API will only provide a link to the appropriate HTML page with the data given some search criteria. Ideally, NLM would provide all of the data via an API, and not just a URL to a page with the information. Page scraping was required to pull individual pieces of data from the pages.

We were able to make the data connection by:

* Creating a Drug List API to page scrape the [MedlinePlus list of drugs](http://www.nlm.nih.gov/medlineplus/druginformation.html) and their corresponding detail page URL using [Kimono](https://www.kimonolabs.com/)
* Creating a Drug Details API to return the drug name, important warnings, and side effect lists for each [individual drug detail page](http://www.nlm.nih.gov/medlineplus/druginfo/meds/a682159.html) using [Kimono](https://www.kimonolabs.com/)
* Calling the [MedlinePlus Connect API ](http://www.nlm.nih.gov/medlineplus/connect/service.html)and passing in the package_ndc field from the FDA Label API
* Using the URL returned from the MedlinePlus Connect API to filter the Drug Details data


