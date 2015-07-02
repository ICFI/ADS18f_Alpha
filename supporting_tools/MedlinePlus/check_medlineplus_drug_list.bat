REM Use the two names check
del /q drug_names.txt

http get https://www.kimonolabs.com/api/28uc6txu?apikey=ccd6193622ff57abba820615e71ac026^&kimhash=1^&kimindex=1^&kimoffset=0 > drug_names.json
jq ".results.drug_info[] | .drug_name_link.text" drug_names.json >> drug_names.txt

http get https://www.kimonolabs.com/api/28uc6txu?apikey=ccd6193622ff57abba820615e71ac026^&kimhash=1^&kimindex=1^&kimoffset=2500 > drug_names.json
jq ".results.drug_info[] | .drug_name_link.text" drug_names.json >> drug_names.txt

http get https://www.kimonolabs.com/api/28uc6txu?apikey=ccd6193622ff57abba820615e71ac026^&kimhash=1^&kimindex=1^&kimoffset=5000 > drug_names.json
jq ".results.drug_info[] | .drug_name_link.text" drug_names.json >> drug_names.txt

http get https://www.kimonolabs.com/api/28uc6txu?apikey=ccd6193622ff57abba820615e71ac026^&kimhash=1^&kimindex=1^&kimoffset=7500 > drug_names.json
jq ".results.drug_info[] | .drug_name_link.text" drug_names.json >> drug_names.txt

jq ".results.drug_info[] | .drug_name_link.text" drug_names.json >> drug_names.txt

http get https://www.kimonolabs.com/api/28uc6txu?apikey=ccd6193622ff57abba820615e71ac026^&kimhash=1^&kimindex=1^&kimoffset=10000 > drug_names.json
jq ".results.drug_info[] | .drug_name_link.text" drug_names.json >> drug_names.txt


type drug_names.txt
