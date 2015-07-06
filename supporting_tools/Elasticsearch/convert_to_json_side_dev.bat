set url=%elastic_search_url%


set load_type=side_effect
set index=fda_dev


del /q .\data*.json

call http DELETE %url%/%index%/_query?q=_type:%load_type%


for %%i in (.\full_side_effects.txt) do call gawk-w32 -f awk_lib.awk -f convert_to_json_side.awk %%i 


for %%i in (.\data*.json) do call http POST %url%/%index%/_bulk < %%i > results.txt

