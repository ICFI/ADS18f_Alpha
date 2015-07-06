:loop

set /p name=Enter Brand Name: 

 set search=Advil
 set fda_query_term=brand_name:%name%
 python query_and_highlight.py > results_single.html
start results_single.html
 

goto loop





