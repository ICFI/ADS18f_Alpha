http post %url%/%index%/drug/_search?pretty=true < autocomplete_drug_names_oxy_all.json > test.json
type test.json

http post %url%/%index%/drug/_search?pretty=true < autocomplete_drug_names_oxy_brand.json > test.json
type test.json




http post %url%/%index%/drug/_search?pretty=true < autocomplete_drug_names_adv_brand.json > test.json
type test.json

http post %url%/%index%/drug/_search?pretty=true < autocomplete_drug_names_adv_all.json > test.json
type test.json

http post %url%/%index%/drug/_search?pretty=true < autocomplete_drug_names_adv_brand_boost.json > test.json
type test.json
