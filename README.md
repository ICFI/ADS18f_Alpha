#Medcheck.gov 

![Mary Schwarz](http://www.icfi.com/~/media/Images/ICFi/People/ICF/Schwarz_Mary.ashx?mw=214)

[Mary Schwarz, ICF Product Manager](http://www.icfi.com/about/our-people/icf/s/schwarz-mary)

---Government is charged with promoting the welfare of its citizens. Digital services are a path to making our lives better. Small digital pilots are producing breakthroughs where large traditional initiatives once floundered. Small stories that have government-sized impact on a personal level present the greatest opportunity to build a better digital government. Our small story revolves around a lean tool that gives meaning to the vast amount of data available through open.fda.gov. The tool also encourages adverse event reporting, an FDA priority.##Developing a StorySo, how do we get there? Let’s start with George:> Newly diagnosed with HIV, George just started  antiretroviral therapy. The number and combination of drugs he takes is overwhelming. Three days in, George starts running a fever, normal?  He googles HIV and Abacavir, and goes to MedCheck. gov. There George enters his side effects and the drugs he is taking. He quickly confirms that yes, fever is a known side effect, and a fairly common one. He is given the drug’s safety information, instructed to call his doctor, and prompted to report this to the FDA.Stories like “George” inspired our team to create [MedCheck.gov](https://ads18f-alpha.herokuapp.com). Helping George meant bringing together a team from across ICF’s different disciplines and domains. We live in multiple time zones, so used our Fairfax office as our physical hub with much of our work and collaboration taking place via GitHub, Slack, and video chat.Throughout the process we found that our best work was accomplished through smaller pods -- focused teams building concrete deliverables as part of the larger solution. Designers, UX, and developers “sat” with experts to understand which data in the API was important, piecing through to identify the components and fields that would form a prototype.We spent most of the first day playing out different user scenarios and exploring what the API was capable of delivering. Within this framework, we worked through a number of user experience exercises, like “10+10”, “Yes, and”, and journey mapping. These narrowed our focus and gave us a basis for the solution. Each day, we ran a retrospective to think through what we did right, understand where we missed the mark, and develop a plan for the next day.On top of this collaborative process, we employed an agile approach. With the goal of shipping usable software quickly, we mixed elements of Lean (quickly determine user needs and possible solutions), Kanban (map tasks and progress), and Scrum (adjust processes to improve communications, focus, and speed through time boxes, ceremonies and roles) to fit within the challenge timeframe, team skillsets, and constraints of vacations and existing commitments. Lightweight wireframes, design documentation, whiteboard, shared pictures, and BDD tests were used to communicate ideas, scope, and progress. Early in the process, we tested a number of hypotheses and approaches with users, finding words they would use to search and exploring how they would go about looking for information. We studied how they would frame questions and what they would ask, which led to the development of Mad Lib styled prototype:> “Can ______MEDICINE_____ Cause ____SIDE EFFECT_____?” Symptom and side effect searches are common. Pew Research reported that 40% of internet users in a health crisis turn to their mobile devices for information. We’ve built a tool that both provides enough information to answer these just-in-time questions and helps FDA realize its mission. This simple approach became our first minimum viable product (MVP).
##Our Development EnvironmentAPI wrapping layers were created using Node.js and Express.js that facilitate use of intermediary services, such as the Open FDA REST WebService and ElasticSearch, to consolidate multiple data sources, streamline data discovery, increase test coverage, and expose the utility for third party publishing.With each test, we started with a clean concept and developed behavior-focused unit tests leveraging the Chai syntax library and the Mocha test-runner framework.  Our continuous integration and deployment environment created a pipeline using CodeShip and Heroku, to quickly test, draft and deliver a working product.
  
![codeship](https://codeship.com/projects/064b5b60-ccc7-0132-6144-6a54a98ad524/status?branch=master)

MVPs 1, 2 and 3 are published to our production server, an Nginx (“Engine X”) proxy server on an Amazon WebServices Unbuntu AMI. Running [name tools here] we tested the tool to ensure it meets best-in-class load times and performance while ensuring cross-platform compatibility.

Logging over 70 issues, we used Github with a Slack integration to quickly establish a playground and integrated communication flow for common queries, use cases, and potential pitfalls generated from this simple Mad Lib query. Each small issue was captured, assigned, and addressed in a collaborative and interative fashion.

##Testing
Based on the analytics data from similar health projects, we established a baseline for browser (most operating system releases for Firefox, Chrome, and Safari) and device testing:

###Browsers
* Google Chrome (Windows and MacOS)
* Internet Explorer 9+ (Windows 7, Windows 8)
* Firefox (Windows and MacOS)
* Safari (MacOS)

###Devices
* iPhone 5 (iOS8)
* iPhone 6 (iOS8)
* iPhone 6+ (iOS8)
* iPad 3 (iOS8)
* Samsung Galaxy S5 (Android 4.4)
* Samsung Galaxy Note 4 (Android 4.4)
* Google Nexus 7 tablet (Android 4.4.2)
* Windows Surface Pro (Windows 8 + IE11)

###508
To ensure accessibility as a matter of course, we developed to WCAG 2.0 standards and performed a [508 check](link to 508 report in github) prior to final release.

###Web Performance
