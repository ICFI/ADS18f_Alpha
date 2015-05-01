ICF Interactive

Welcome!
This is the baseline application constucted leveraging BDD 
techniques on the MEAN stack.  The dev environment consists of Cloud9 IDE,
Heroku, GitHub and CodeShip.  The prototype environment leverages an AWS ec2
instance replacing Heroku as the app server. 

Integrated CodeShip. Testing build
Integrated CodeShip continuous deployment with Heroku.

# Initial 750 Words
On January 9th, 18F released an Agile Delivery Services RFI, and challenged respondents to show not tell. Now I have always been a believer that actions speak louder, and this approach removed the constraints of page counts, font sizes, and compliance matrices. We were allowed to just do. To design, to work cooperatively, to test, revise, build, expand, refine, and deliver something real.  
 
It was exhilarating. More so, it was revealing.
 
The RFI was the best stress test we could have asked for. We reaffirmed the essential nature of having real-life users on hand to define, inform, and validate. We proved that we had the skills, knowledge, and will to respond with a best-of-class solution. We also learned a lot about what we didn’t know.
 
To overcome these deficiencies, we had to practice. Following the same basic principles, we designed a way to prepare for the RFP, to advance not only our readiness but to make a place where all the crazy and beautiful ideas we hatch and nurture become the normal way to work. 
 
We sourced our own challenges, gave our teams a day to analyze the problem, understand audience needs, define a solution, qualify a viable product, and build. Debriefs and retrospectives became second nature. We isolated the points where assumptions were being made when conversations should have happened; began thinking in terms of interchangeable parts, building a core set of components that we found we would need in a majority of challenges; and identified overlapping skillsets on the team, allowing for teamed programming.
 
Results? We found our right mix … defining both what the team would need to succeed in a 3-day challenge, as well as qualify a tech stack that best supports rapid development of working code. We focused on APIs, knowing that we wanted to design for content versus a specific medium or tool. We built out the automated aspects of a continuous delivery / continuous integration environment, and surveyed across our commercial and federal dev teams to learn more about their favorite open source frameworks and understand the advantages of each.
 
[diagram from Andy: IDE >> GitHub >> CodeShip >> Heroku >> AWS]
 
Two dry runs in, we had a refined process that rapidly qualifies a user-focused MVP and sequential sprints; established how far we could take server calls allowing for front-end developers, UX, and the back-end team to develop and iterate in parallel; increased test coverage; and created API wrapping layers allowing use of intermediary services such as ElasticSearch to consolidate multiple data sources and streamlined data discovery.
 
Has all of this helped? Yes.
****************************************