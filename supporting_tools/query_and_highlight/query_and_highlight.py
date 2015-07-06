import requests, json
import re
import os



query_term = os.environ["fda_query_term"]
fda_key = os.environ["fda_key"]


def main():
	print("Query term: " + query_term + "<br/>")
	
	 	
	url = "https://api.fda.gov/drug/label.json?api_key=" + fda_key + "&search=" + query_term + "&limit=20"
	print("Retrieving: " + url + "<br/>")
	r = requests.get(url)
	results = r.json()
	total = get_total_hits(results)
	print("Found: " + str(total) + "<br/>")
	
	
	print_table_of_contents_links(results)
		
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


def get_spl_product_data_elements(hit_json_data):
	field = "spl_product_data_elements"
	if (field in hit_json_data):
		return format_field(field, hit_json_data[field], True)
	else:
		return "*no " + field + "*"
		

def format_field(field, field_data, escape_data):
	field_data = str(field_data)
	if (escape_data):
		field_data = escape_text(field_data)
		field_data = highlight_query_term(field_data)
	data = "<tr><td><i>" + field + "</i>:</td><td>" + field_data + "</td></tr>"
	return data


def highlight_query_term(field_data):
	query_term_check = remove_quotes(query_term)
	query_term_check = remove_query_term_field_reference(query_term_check)
	field_data = re.sub(query_term_check, "<b style='color:red'>" + query_term_check + "</b>", field_data, flags = re.IGNORECASE)
	return field_data


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
			if (field == "adverse_reactions_table"):
				data = format_field(field, "ziegler")
				print(data)
			else:
				data = format_field(field, hit_json_data["openfda"][field], True)
				print(data)
		print("</table>")


def print_label_info(hit_json_data):
	print("<table rules='all' border='1'>")
	for field in hit_json_data:
			if (field.endswith("_table")):
				data = format_field(field, hit_json_data[field], False)
				print(data)
			else:
				data = format_field(field, hit_json_data[field], True)
				print(data)	
	print("</table>")


def loop_through_results(full_json_data):
	count = 0
	for hit in full_json_data["results"]:
		count = count + 1
		brand_name = get_drug_brand_name(hit)
		spl_product_data_elements = get_spl_product_data_elements(hit)
		print("<h1 ><a name='" + str(count) + "'/>" + str(count) + ". " + brand_name + "</h1>")
		
		print("<h2>Name info:</h2>")
		print_openfda_name_info(hit)

		print("<h2>Label info:</h2>")
		print_label_info(hit)

		print("<br/>")
		print("<hr style='color:red'/>")
		print("<br/>")
		

main()