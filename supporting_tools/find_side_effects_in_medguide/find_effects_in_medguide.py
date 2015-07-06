import requests, json
import re
import os



query_term = os.environ["fda_query_term"]
env_field_term = os.environ["field"]
fda_key = os.environ["fda_key"]



def main():
	print("<h1>Query term: " + query_term + "</h1>")
	url = "https://api.fda.gov/drug/label.json?api_key=" + fda_key + "&search=" + query_term + "&limit=5"
	r = requests.get(url)
	results = r.json()
	total = get_total_hits(results)
	print("<h2>Found: " + str(total) + "</h2>")
	print("Retrieving: " + url + "<br/>")
	
	
	loop_through_results(results)

	


def get_total_hits(full_json_data):
	return full_json_data["meta"]["results"]["total"]


def print_table_of_contents_links(full_json_data):
	print("<ul>")
	count = 0
	for hit in full_json_data["results"]:
		count = count + 1
		brand_name = get_drug_brand_name(hit)
		brand_name_link = "<li><a href='#" + str(count) + "'>" + brand_name + "</a></li>"
		print(brand_name_link)
	print("</ul>")


def escape_text(text):
	return re.sub(r'[^a-zA-Z0-9 ,.?!\t\"\(\)]', "", str(text))
	

def get_drug_brand_name(hit_json_data):
	field = "brand_name"
	if (field in hit_json_data["openfda"]):
		return escape_text(hit_json_data["openfda"][field])
	else:
		return "*no " + field + "*"


	

def format_field(field, field_data, escape_data):
	field_data = str(field_data)
	if (escape_data):
		field_data = escape_text(field_data)
		field_data = highlight_query_term(field_data)
	data = "<i>" + field + "</i>: " + field_data 
	return data


def highlight_query_term(field_data):
	query_term_check = remove_quotes(query_term)
	query_term_check = remove_query_term_field_reference(query_term_check)
	query_term_and_words = ".{0,30}" + query_term_check + ".{0,30}"
	# print("<br/>checking for: " + query_term_check + " in " + field_data)
	
	
	match_obj = re.search(query_term_and_words, field_data, flags = re.IGNORECASE)
	matched_string = ""
	if (match_obj == None):
		return ""
	else: 
		matched_string = match_obj.group() 
		matched_string = matched_string.replace(query_term_check, "<span style='color:red'>" + query_term_check + "</span>")
		return matched_string


def remove_quotes(text):
	return text.replace("\"", "")
	

def remove_query_term_field_reference(text):
	if (":" in text):
		parts = text.split(":")
		return parts[1]
	else:
		return text
	

def print_openfda_name_info(hit_json_data):
	if ("openfda" in hit_json_data):
		print("<table rules='all' border='1'>")
		data = ""
		for field in hit_json_data["openfda"]:
			data = format_field(field, hit_json_data["openfda"][field], True)
			print(data)
		print("</table>")


def get_label_info(hit_json_data):
	
	data = format_field(env_field_term, hit_json_data[env_field_term], True)
	return data


def loop_through_results(full_json_data):
	count = 0
	print("<table>")
	for hit in full_json_data["results"]:
		count = count + 1
		brand_name = get_drug_brand_name(hit)
		match = get_label_info(hit)
		print("<tr><td>" + brand_name + "</td><td>" + match + "</td>")
	print("</table>")
	print("<br/>")
	print("<hr style='color:red'/>")
	print("<br/>")		

main()