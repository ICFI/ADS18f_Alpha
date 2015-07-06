# MedCheck.gov
This is a Node.js application for searching drugs and side-effect interactions against
the OpenFDA WebService. The primary stack consists of Node, Express and Angular.  Other 
libraries are used for security handling and utility functions

## Prerequisites
1. Install Node.js
2. Install ElasticSearch (or use Bonsai.io)
3. Ensure outbound traffic is allowed in your environment over ports 80/443

## Components
There are a couple of moving parts in this repository that you should
know about before proceding:

1. The server in `server.js` is an [Express] app that renders an
   HTML page which serves as entry point for the application.
2. The server also contains a series of accessible APIs which service the application
   but can also service other modes of multichannel communication
3. The test suite is a [Mocha] test script that uses the PhantomJS [WebDriver] API 
   to test APIs and supporting domain functions.


## Setup
Clone this repo and install the dependencies via [npm]:

```sh
git clone https://github.com/ICFI/ADS18f_Alpha.git
cd ADS18f_Alpha
npm install
```

### Verify
Next up, you can verify that the test server works by calling `node server.js`. This
fires up an [Express] server that serves up a page with the entry point of the application. 
You can confirm that it's running by visiting
[http://localhost:3000](http://localhost:3000) in a web browser, or:

```sh
curl -s http://localhost:3000
```
For productioninstallations, it is recommended to use a process service such as PM2.

### Configure ElasticSearch
Perform a base installation of Elasticsearch.

* Create the "fda" index using the create_fda_index.json file here (
from https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_tools/Elasticsearch/Ngrams/create_fda_index.json).
Be sure to use the URL of your Elasticsearch instance:
```sh	
http POST http://localhost:9200/fda < create_fda_index.json
```

* Load the data into Elasticsearch using the bulk format with the two data files (https://github.com/ICFI/ADS18f_Alpha/tree/master/supporting_data)
```sh	
http POST http://localhost:9200/fda/_bulk < medicines.json
http POST http://localhost:9200/fda/_bulk < side_effects.json
```

Before you can run the tests, you'll need to set some environment
variables so that the scripts can pass your credentials along to ElasticSearch. The
easiest way to do this is to execute the following commands in your shell environment:

```sh
export ES_USER="your-elasticsearch-username"
export ES_PWD="your-elasticsearch-key"
```
If your environment's security policy prevents your application to access environment params,
you can copy the /server/config.js to the /home/{appuser}/etc/config.js and update credentials
appropriately.

### Run the Tests
If code modifications are made, you should re-run the unit tests.
In a shell, cd to the root application directory run the tests:

```sh
mocha test/server
```
