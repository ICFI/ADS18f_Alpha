set url=%elastic_search_url%

http DELETE %url%/fda

http PUT %url%/fda < create_fda_index.json

http PUT %url%/fda/drug/_mapping < drug_mapping.json
http PUT %url%/fda/side_effect/_mapping < side_effect_mapping.json


http POST %url%/fda/_analyze?analyzer=autocomplete test="steve"

