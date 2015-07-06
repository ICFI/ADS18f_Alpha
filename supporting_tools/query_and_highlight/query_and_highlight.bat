
 set search=Advil
 set fda_query_term=brand_name:%search%
 python query_and_highlight.py > results_%search%.html
 results_%search%.html
 
  set search=Varenicline
  set fda_query_term=brand_name:%search%
  python query_and_highlight.py > results_%search%.html
  results_%search%.html
  
 
 
 set search=Energy
 set fda_query_term=brand_name:%search%
 python query_and_highlight.py > results_%search%.html
 results_%search%.html
 
 
 set search=Lipitor
 set fda_query_term=brand_name:%search%
 python query_and_highlight.py > results_%search%.html
 results_%search%.html
 
 
 set search=Tylenol
 set fda_query_term=brand_name:%search%
 python query_and_highlight.py > results_%search%.html
 results_%search%.html
 
 
 set fda_query_term=brand_name:Prilosec
 python query_and_highlight.py > results_Prilosec.html
 results_Prilosec.html
 
 
 set fda_query_term=Diabetes
 python query_and_highlight.py > results_Diabetes.html
 results_Diabetes.html
 
 
 set fda_query_term=adverse_reactions:vomiting
 python query_and_highlight.py > results_vomiting.html
 results_vomiting.html
 
 
 set fda_query_term=pregnancy_or_breast_feeding:"last 3 months"
 python query_and_highlight.py > results_pregnant.html
 results_pregnant.html
 
 
 set fda_query_term=overweight
 python query_and_highlight.py > results_overweight.html
 results_overweight.html
 
 
set fda_query_term=OxyContin
python query_and_highlight.py > results_oxycontin.html
results_oxycontin.html









