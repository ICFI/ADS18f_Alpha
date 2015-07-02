del /q kimono.txt

http get https://www.kimonolabs.com/api/27usqi04?apikey=%kimono_key%^&kimhash=1^&kimwithurl=1 >> kimono.txt
echo next  >> kimono.txt
http get https://www.kimonolabs.com/api/27usqi04?apikey=%kimono_key%^&kimhash=1^&kimwithurl=1^&kimoffset=2500 >> kimono.txt
echo next  >> kimono.txt
http get https://www.kimonolabs.com/api/27usqi04?apikey=%kimono_key%^&kimhash=1^&kimwithurl=1^&kimoffset=5000 >> kimono.txt
echo next  >> kimono.txt
http get https://www.kimonolabs.com/api/27usqi04?apikey=%kimono_key%^&kimhash=1^&kimwithurl=1^&kimoffset=7500 >> kimono.txt
echo next  >> kimono.txt
http get https://www.kimonolabs.com/api/27usqi04?apikey=%kimono_key%^&kimhash=1^&kimwithurl=1^&kimoffset=10000 >> kimono.txt
