REM Oxycontin "Product NDC" - doesn't work
set code=16590617
http get http://apps.nlm.nih.gov/medlineplus/services/mpconnect_service.cfm?mainSearchCriteria.v.cs=2.16.840.1.113883.6.69^&mainSearchCriteria.v.c=%code%^&mainSearchCriteria.v.dn= > results_connect_%code%.txt
type results_connect_%code%.txt


REM Oxycontin "Package NDC" - does work
set code=1659061790
http get http://apps.nlm.nih.gov/medlineplus/services/mpconnect_service.cfm?mainSearchCriteria.v.cs=2.16.840.1.113883.6.69^&mainSearchCriteria.v.c=%code%^&mainSearchCriteria.v.dn= > results_connect_%code%.txt
type results_connect_%code%.txt



REM Prilosec "Package NDC" - does work
set code=3700045904
http get http://apps.nlm.nih.gov/medlineplus/services/mpconnect_service.cfm?mainSearchCriteria.v.cs=2.16.840.1.113883.6.69^&mainSearchCriteria.v.c=%code%^&mainSearchCriteria.v.dn= > results_connect_%code%.txt
type results_connect_%code%.txt


