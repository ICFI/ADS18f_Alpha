import requests, json
import re
import os
import time


master_term_dict = dict()
routes = dict()
fda_key = os.environ["fda_key"]


def main():
	 
	# While OpenFDA is a well-designed API that provides lots of flexibility in searching and aggregating the data,
	# the 1,000 item limit on counts is limiting and appears arbitray. While you could call the API for all 
	# 70K rows, it's inefficient, especially since all fields are returned when I only need one field: openfda.brand_name.
	# It also would take a long time given the required throttling. 
	#
	# It's made it really hard to get a unique list of brand names across the 70K Drug-Label records
	# So, I need a way to chunk the 70K Drug-Label records in to a set with less than 1K items
	# and hope that each one of those chunks had less than 1K brand names. The Route field
	# seems to provide the best hope.
	# 
	# I was hoping to get 95% of unique brand names with just 138 API calls (138 routes) this way.
	# After looking at the data, it's missing some popular brand names that I expected to see (Advil, Tylenol, ...)
	# So, for the MVP, I searched for popular prescription drugs, OTC drugs, and dangerous drugs (blog posts from web search)
	# and specifically added those.

	
	get_routes()
	process_routes()
	


def get_routes():
	url = "https://api.fda.gov/drug/label.json?api_key=" + fda_key + "&search=_exists_:openfda.brand_name&count=openfda.route.exact&limit=1000"
	print("Retrieving: " + url )
	r = requests.get(url)
	route_results = r.json()
	for route_item in route_results["results"]:
		term = route_item["term"]
		count = route_item["count"]
		routes[term] = count


def escape_space(text):
	return text.replace(" ", "+")


def process_routes():
	master_term_dict.clear()
	for route in routes:
		print("Processing route: " + route)
		escaped_route = escape_space(route)
		get_generic_names(escaped_route)
		time.sleep(1) # throttle back given rate limits
	create_output("terms_generic_names.txt")

	master_term_dict.clear()
	for route in routes:
		print("Processing route: " + route)
		escaped_route = escape_space(route)
		get_brand_names(escaped_route)
		time.sleep(1) # throttle back given rate limits

	get_names_for_all_popular_brand_names()

	create_output("terms_brand_names.txt")



def get_names(route, name_type):
	url = "https://api.fda.gov/drug/label.json?api_key=" + fda_key + "&search=openfda.route:\"" + route + "\"&count=" + name_type + ".exact&limit=1000"
	#print("\tRetrieving: " + url )
	r = requests.get(url)
	results = r.json()
	newly_found_terms_count = process_names(results)	
	print("\tNewly found terms: " + str(newly_found_terms_count))



def get_names_for_all_popular_brand_names():
	# The 10 Best-Selling Drugs
	# It shouldn't be a surprise that these generic drugs are not the ones bringing in the big bucks for pharmaceutical companies. The drugs on which we spend the most money are those that are still new enough to be protected against generic competition.
	# 
	# The IMS reports that Americans spent $307 billion on prescription drugs in 2010. The 10 drugs on which we spent the most were:
	# 
	# Lipitor, a cholesterol-lowering statin drug -- $7.2 billion
	# Nexium, an antacid drug -- $6.3 billion
	# Plavix, a blood thinner -- $6.1 billion
	# Advair Diskus, an asthma inhaler -- $4.7 billion
	# Abilify, an antipsychotic drug -- $4.6 billion
	# Seroquel, an antipsychotic drug -- $4.4 billion
	# Singulair, an oral asthma drug -- $4.1 billion
	# Crestor, a cholesterol-lowering statin drug -- $3.8 billion
	# Actos, a diabetes drug -- $3.5 billion
	# Epogen, an injectable anemia drug -- $3.3 billion
	get_names_for_popular_brand_name("Lipitor")
	get_names_for_popular_brand_name("Nexium")
	get_names_for_popular_brand_name("Plavix")
	get_names_for_popular_brand_name("Advair")
	get_names_for_popular_brand_name("Abilify")
	time.sleep(1) # throttle back given rate limits
	get_names_for_popular_brand_name("Seroquel")
	get_names_for_popular_brand_name("Crestor")
	get_names_for_popular_brand_name("Actos")
	get_names_for_popular_brand_name("Epogen")
	time.sleep(1) # throttle back given rate limits

	# Get popular OTCs
	get_names_for_popular_brand_name("Tylenol")
	get_names_for_popular_brand_name("Advil")
	get_names_for_popular_brand_name("No-Doz")
	get_names_for_popular_brand_name("Codeine")
	time.sleep(1) # throttle back given rate limits
	get_names_for_popular_brand_name("Extenze")
	get_names_for_popular_brand_name("Dramamine")
	get_names_for_popular_brand_name("Robax Platinum")
	get_names_for_popular_brand_name("Nicorette")
	time.sleep(1) # throttle back given rate limits
	get_names_for_popular_brand_name("Zyrtec")
	get_names_for_popular_brand_name("Sudafed Elixir")
	get_names_for_popular_brand_name("Robitussin")
	
	# Get drugs with distrubing side effects or dangerous
	get_names_for_popular_brand_name("Avandia")
	get_names_for_popular_brand_name("Actos")
	get_names_for_popular_brand_name("Paxil")
	get_names_for_popular_brand_name("Prozac")
	time.sleep(1) # throttle back given rate limits
	get_names_for_popular_brand_name("Effexor")
	get_names_for_popular_brand_name("Zoloft")
	get_names_for_popular_brand_name("Lexapro")
	get_names_for_popular_brand_name("Depakote")
	time.sleep(1) # throttle back given rate limits
	get_names_for_popular_brand_name("Yaz")
	get_names_for_popular_brand_name("Yasmin")
	get_names_for_popular_brand_name("Pradaxa ")
	get_names_for_popular_brand_name("Xarelto")
	get_names_for_popular_brand_name("Fosamax")
	
	

def get_names_for_popular_brand_name(name):
	url = "https://api.fda.gov/drug/label.json?api_key=" + fda_key + "&search=openfda.brand_name:\"" + name + "\"&count=openfda.brand_name.exact&limit=1000"
	#print("\tRetrieving: " + url )
	r = requests.get(url)
	results = r.json()
	if (no_matches_found(results)):
		return
	newly_found_terms_count = process_names(results)	
	print("\tNewly found terms: " + str(newly_found_terms_count))
			

def no_matches_found(full_results):
	if ("error" in full_results):
		if (full_results["error"]["message"] == "No matches found!"):
			return True
		else:
			return False
	else:
		return False



def get_brand_names(route):
	get_names(route, "openfda.brand_name")



def get_generic_names(route):
	get_names(route, "openfda.generic_name")
	


def process_names(full_json):
	newly_found_terms_count = 0
	#print(full_json)
	for item in full_json["results"]:
		term = item["term"]
		if need_to_add_new_term(term):	
			newly_found_terms_count = newly_found_terms_count + 1
			if (newly_found_terms_count == 1):
				print("\t" + term)
			master_term_dict[term] = item["count"]
	return newly_found_terms_count		



def need_to_add_new_term(term):
	if term in master_term_dict.keys():
		return False
	else:
		return True

	

def create_output(file_name):
	with open(file_name, "w") as term_output_file:
		for term in master_term_dict:
			term_output_file.write(term + "\t" + str(master_term_dict[term]) + "\n")


main()



