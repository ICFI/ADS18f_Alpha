import requests, json
import re
import os
import logging
from elasticsearch import Elasticsearch



elastic_search_url = os.environ["elastic_search_url"]
kimono_key = os.environ["elastic_search_url"]


def get_medlineplus_data(offset):
	url = "https://www.kimonolabs.com/api/27usqi04?apikey=" + kimono_key + "&kimhash=1&kimwithurl=1&kimoffset=" + str(offset)
	print("Retrieving: " + url )
	logging.info("*\t\tRetrieving: " + url)
	r = requests.get(url)
	results = r.json()
	print("\tCount: " + str(results["count"]))
	return results


def get_kimono_offset(counter):
	return 2500 * counter
	
	
def process_results(results):
	for collection in results["results"]:
		logging.info("*\t\t\tStarting collection: " + collection)
		for item in results["results"][collection]:
			process_single_item(collection, item)
		logging.info("*\t\t\tFinished collection: " + collection)
		
		
def process_single_item(collection, item):
	#logging.debug("*\t\tItem: " + str(item))
	ES = Elasticsearch([elastic_search_url])

	for field in item:
		logging.info("*\t\t\t\t" + field + ": " + str(item[field]))
		reformat_fields_with_href(field, item)
	
	res = ES.index(index="fda_dev", doc_type='medlineplus_' + collection, id=item["hash"], body=item)		




def reformat_fields_with_href(field, item):
	logging.debug("*\t\t\t\treformat_fields_with_href for " + field + " in " + str(item))
	if field_contains_href(field, item):
		logging.info("*\t\t\t\t" + field + " has an href")
		item = set_field_to_href_text(field, item)
	return item


def field_contains_href(field, item):
	contains_href = False
	try:
		contains_href = "href" in item[field]
	except TypeError:
		contains_href = False	
	
	return contains_href
	
	
def set_field_to_href_text(field, item):
	href_text = item[field]["text"]
	item[field] = href_text
	return item


def main():
	logging.basicConfig(filename='log.txt',format='%(asctime)s %(message)s',level=logging.INFO)

	logging.info("*** Starting process")
	
#	for x in range(0, 5):
	for x in range(2, 5):
		logging.info("*\t Starting url #" + str(x))
		offset = get_kimono_offset(x)
		results = get_medlineplus_data(offset)
		process_results(results)
		logging.info("*\t Finished url #" + str(x))
		
	
	logging.info("*** Finished process")



main()

