ICF Interactive

Welcome!
This is the baseline application constucted leveraging BDD 
techniques on the MEAN stack.  The dev environment consists of Cloud9 IDE,
Heroku, GitHub and CodeShip.  The prototype environment leverages an AWS ec2
instance replacing Heroku as the app server. 

Integrated CodeShip. Testing build
Integrated CodeShip continuous deployment with Heroku.

# Initial 750 Words
## ICF Interactive response to 18f Agile Delivery Services

On January 9th, 18F released an Agile Delivery Services RFI, and challenged respondents to show not tell. This approach removed the constraints of page counts, font sizes, and compliance matrices; a refreshing break. We allowed ourselves to just do. To design, to work cooperatively, to test, revise, build, expand, refine, and deliver.   
 
The RFI was the best stress test we could have asked for. Real-life users on hand to define, inform, and validate, proving to ourselves that we had the skills, knowledge, and will to respond with a best-of-class solution. We also learned a lot about what we didn’t know.[^1]
 
So we practiced. Following the same basic principles, we designed a way to prepare for the RFP, to advance our readiness and make a place where all the crazy and beautiful ideas we hatch and nurture become the normal way to work.  
 
We sourced our own challenges based on different datasets on <http://www.data.gov>, giving teams a day to analyze the problem, understand audience needs, define a solution, qualify a viable product, and build. Debriefs and retrospectives followed. We built a core set of components that we found we would need in a majority of challenges; and identified overlapping skillsets on the team, allowing for teamed programming.
 
As a result, we found our right mix … defining what the team would need to succeed in a 3-day challenge and qualifying a tech stack that best supports rapid development of working code. We focused on APIs, knowing that we wanted to design for content versus a specific medium or tool. We built out the automated aspects of a continuous delivery / continuous integration environment, and surveyed across our commercial and federal dev teams to learn more about their favorite open source frameworks and understand the advantages of each.
 
*diagram from Andy: IDE >> GitHub >> CodeShip >> Heroku >> AWS*[^2]
 
Two dry runs in, we had a refined process that rapidly qualifies a user-focused MVP and sequential sprints; established how far we could take server calls allowing for front-end developers, UX, and the back-end team to develop and iterate in parallel; increased test coverage; and created API wrapping layers allowing use of intermediary services such as ElasticSearch to consolidate multiple data sources and streamlined data discovery.

Some of the processes we developed aren't yet fully integrated into our broader organization. We don't typically collaborate on Slack, commit documents via GitHub, or work outside of the existing hosting infrastructure. Tackling this challenge forced us to adapt and the culture change has stuck, bleeding into other projects and teams that we work on in our matrixed organization. 

A quick list, in no particular order 
* Using Slack to integrate all communication for the project. We've dropped email other than as a way to manage the team calendars. Channels devoted to GitHub and Codeship keep everyone aware of development progress. And colleagues have started using it on other projects.
* Developing a continuous integration environment outside of our corporate hosting environment. Playing in a new sandbox has given us different tools, like CodeShip and Heroku, and given us the opportunity to bring those innovations back to our hosting team for integration into our day-to-day production servers. [^3]
* At this point we have a sandbox and tools. Each dry run has taught us that we are using unique materials (data) so we start with a clean concept, but our environment allows us to quickly draft and deliver that initial approach (with code).
 
Tags: readme, process, draft
Authors: Mary Schwarz, Jeremy Vanderlan

[^1]: *JV note - I think we need to say what we didn't know, or at least list a few gaps that we filled*
[^2]: *Pending diagram*
[^3]: *JV note - That might be bullshit, but I like how it sounds*
****************************************