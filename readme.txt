This winter, 18F released an Agile Delivery Services RFI and challenged respondents to show not tell. They removed the constraints of page counts, font sizes, and compliance matrices … a refreshing break. We were allowed to just do. 

This was the best stress test we could have asked for. With a lot of talking, a little bit of fighting, and some very generous real-life users, we proved to ourselves that we had the ability and will to respond with a best-of-class solution. 

We also learned a lot about what we didn’t know.[^1]

So we practiced. Following the same principles laid out in the RFI, we designed a way to prepare. We made a place where all the crazy and beautiful ideas we hatch and nurture became our normal way to work.

We sourced our own challenges and applied new thinking to existing tools, and gave teams a day to analyze the problem, understand audience needs, define a solution, qualify a viable product, and build. Debriefs and retrospectives followed. We relearned the essential nature of reusable code, and built a core set of components that we used time and again. While keeping the teams small, we began coding in pairs, allowing for easy hand offs and a more integrated perspective.

As a result, we found our right mix. We focused on APIs, knowing that we wanted to design for content versus a specific medium or tool. We built out the automated aspects of a continuous delivery / continuous integration environment. We surveyed our commercial and federal dev teams, learned about the advantages and complexities of their favorite open source tools and frameworks.

diagram from Andy: IDE >> GitHub >> CodeShip >> Heroku >> AWS[^2]

Many dry runs in, we have:
-	Refined process that rapidly qualifies a user-focused MVP and sequential sprints
-	Established practices that define how far we can take server calls and allow front-end developers, UX, and the back-end team develop and iterate in parallel
-	Created API wrapping layers that facilitate use of intermediary services such as ElasticSearch to consolidate multiple data sources and streamlined data discovery, and increased test coverage.

With each test, we’ve started with a clean concept and relied up on a continuous integration environment as well as tools, like CodeShip and Heroku, to quickly draft and deliver a working product. Tackling this challenge compelled us to adapt. It renewed our focus and infused a new energy and purpose. We are ready, and can’t wait to see what the next challenge brings.
