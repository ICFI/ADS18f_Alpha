set url=%elastic_search_url%

http DELETE %url%/fda_dev 

http PUT %url%/fda_dev < create_fda_index.json

http PUT %url%/fda_dev/drug/_mapping < drug_mapping.json
http PUT %url%/fda_dev/side_effect/_mapping < side_effect_mapping.json


http POST %url%/fda_dev/_analyze?analyzer=autocomplete test="steve"

