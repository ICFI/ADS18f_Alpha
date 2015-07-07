#Medcheck.gov 
[MedCheck.gov](https://ads18f.icfwebservices.com/)

![Mary Schwarz](http://www.icfi.com/~/media/Images/ICFi/People/ICF/Schwarz_Mary.ashx?mw=214)

[Mary Schwarz, ICF Product Manager](http://www.icfi.com/about/our-people/icf/s/schwarz-mary)

---
Government is charged with promoting the welfare of its citizens. Digital services are a path to making our lives better. Digital pilot projects are producing breakthroughs where large traditional initiatives once floundered. Small stories that have government-sized impact on a personal level present the greatest opportunity to build a better digital government.
 
Our small story revolves around a lean tool that gives meaning to the vast amount of data available through open.fda.gov. The tool also encourages adverse event reporting, an FDA priority.

##Developing a Story
So, how do we get there? Let’s start with George:

> Newly diagnosed with HIV, George just started  antiretroviral therapy. The number and combination of drugs he takes is overwhelming. Three days in, George has bouts of nausea and is vomiting. Is this normal?  He googles HIV and Abacavir, and goes to MedCheck.gov. There, George enters his side effects and the drugs he is taking. He quickly confirms that yes, vomiting is a known side effect, and a fairly common one. He is given the drug’s safety information, instructed to call his doctor, and prompted to report this to the FDA.

Stories like “George” inspired our team to create [MedCheck.gov](https://ads18f.icfwebservices.com/). 

Helping George meant bringing together a [team](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_b/Team.png) from across ICF’s different disciplines and domains. We live in multiple time zones, so used our Fairfax office as our physical hub with much of our work and collaboration taking place via GitHub, Slack, and video chat.

##Our Approach
Throughout the process we found that our best work was accomplished through smaller pods -- focused teams building concrete deliverables as part of the larger solution. Designers, UX, and developers “sat” with experts to understand which data in the API was important, piecing through to identify the components and fields that would form a prototype.

We spent most of the first day playing out different user scenarios and exploring what the API was capable of delivering. Within this framework, we worked through a number of [user experience exercises](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_d/HCD%20Showcase.png), including [10+10](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_d/10%2B10.png), [Content Modeling](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_d/ContentModel.png), [Content Strategy](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_d/ContentStrategy.png), [Heuristic Evaluation](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_d/HeuristicEvaluation.png), and [Journey Mapping](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_d/CustomerJourneyMap.png). These narrowed our focus and gave us a basis for the solution. Each day, we ran a retrospective to think through what we did right, understand where we missed the mark, and develop a plan for the next day.

In parallel with our design activities, we researched the available APIs to see what was possible given the data. We created [scripts to explore the data](https://github.com/ICFI/ADS18f_Alpha/tree/master/supporting_tools/query_and_highlight) and quickly decided to focus on the Label API given how relatable this data would be to consumers and our Product Manager’s expertise in this area. Because most of the Label data is unstructured text, we evaluated the feasibility of design ideas through [data scripting prototypes](https://github.com/ICFI/ADS18f_Alpha/tree/master/supporting_tools/find_side_effects_in_medguide).

On top of this collaborative process, we employed an agile approach. With the goal of shipping usable software quickly, we mixed elements of Lean UX (quickly determine user needs and possible solutions), Kanban (map tasks and progress), and Scrum (adjust processes to improve communications, focus, and speed through time boxes, ceremonies and roles) to fit within the challenge timeframe, team skillsets, and constraints of vacations and existing commitments. 

[Lightweight wireframes](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_d/Wireframe.png), design documentation, whiteboard, shared pictures, and BDD tests were used to communicate ideas, scope, and progress. 

Early in the process we [recruited](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_f/Recruit_Ad.PNG) representative end users and [tested](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_f/UserTest2%20User2.jpg) and [documented](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_f/User_testing_notes.docx) a number of hypotheses and approaches. Designers, UX, and subject matter experts co-designed how people would frame questions, what words they would use, and what they would look for, which led to the development of a Mad Lib styled prototype:

> “Can ______MEDICINE_____ Cause ____SIDE EFFECT_____?” 

Symptom and side effect searches are common. Pew Research reported that 40% of internet users in a health crisis turn to their mobile devices for information. We’ve built a tool that provides enough information to answer these just-in-time questions and helps FDA realize its mission. This simple approach became our first minimum viable product (MVP).

We then set on making the data equally as user-friendly as the interface. The `brand_name`, `generic_name`, and `package_ndcs` fields provided synonyms and great cross-references to common names and links to other APIs. We found the `adverse_reactions_table` field had the most structured and accurate information for side effects and initially returned the `spl_medguide` since it was written in plain language. We realized the Label data could be connected to the Adverse Events data through the `openfda` and `reactionmeddrapt` fields to provide more quantitative information to the user. We also discovered how to [connect FDA API to the well-written MedlinePlus](https://github.com/ICFI/ADS18f_Alpha/tree/master/supporting_tools/MedlinePlus) drug guides through package NDCs, the MedlinePlus Connect API, and pages scraped with Kimono. 

##Our Development Environment
API wrapping layers were created [using Node.js](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_i/NodeJS_Server.png) and Express.js that facilitate use of intermediary services, such as the Open FDA REST WebService and [ElasticSearch](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_i/ElasticSearch.png), to consolidate multiple data sources, streamline data discovery, increase test coverage, and expose the utility for third party publishing.

With each test, we started with a clean concept and developed behavior-focused [unit tests](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_i/Mocha_Chai_Tests.png) leveraging the Chai syntax library and the Mocha test-runner framework.  Our continuous integration and deployment environment created a pipeline using CodeShip and Heroku, to quickly test, draft and deliver a working product.
  
![codeship](https://codeship.com/projects/064b5b60-ccc7-0132-6144-6a54a98ad524/status?branch=master)

MVPs 1 and 2 are published to our production server, an [NGINX proxy server](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_i/Nginx.png) on an [Amazon WebServices Unbuntu AMI](https://github.com/ICFI/ADS18f_Alpha/blob/master/supporting_documentation/evidence_i/PM2ProcessManager.png). 

Logging over 20 issues, we used GitHub with a Slack integration to quickly establish a playground and integrated communication flow for common queries, use cases, and potential pitfalls generated from this simple Mad Lib query. Each issue was captured, assigned, and addressed in a collaborative and interative fashion. The list of GitHub issues eventually became our main focus for scope, pushing us to clean up MVP 2 instead of starting new MedlinePlus data enrichment in MVP 3.

For front-end development we utilized Angular.js and Twitter Bootstrap as frameworks for the HTML template. The responsive patterns established by Bootstrap allowed us to quickly develop a prototype that worked across most modern devices and operating systems. We created a [style guide](https://ads18f.icfwebservices.com/css/style-guide.html) to specifically define the colors, text, and other styles necessary to develop the application.

##Testing
In addition to quality assurance via GitHub, our use case testing, and the continuous integration environment with automated testing, we ran additional tests to verify the site met standards for security, performance, accessbility, and browser compatibility.


###Browsers
Based on the analytics data from similar health projects, we established a baseline for browser (most recent operating system releases for Firefox, Internet Explorer, Chrome, and Safari) and device testing:

* Google Chrome (Windows and MacOS)
* Internet Explorer 9+ (Windows 7, Windows 8)
* Firefox (Windows and MacOS)
* Safari (MacOS)

###Devices
Device testing for mobile ensures that touch targets fit fingers and actions execute properly. Emulators alone do not capture everything, so we walked through our user stories on the following devices:

* [iPhone 5 (iOS8)](https://github.com/ICFI/ADS18f_Alpha/blob/master/testing/mobile/iphone5-18f-test2.png)
* [iPhone 6 (iOS8)](https://github.com/ICFI/ADS18f_Alpha/blob/master/testing/mobile/iphone6-18f-test.png)
* [iPhone 6+ (iOS8)](https://github.com/ICFI/ADS18f_Alpha/blob/master/testing/mobile/iphone6plus-18f-test-2.png)
* [iPad 3 (iOS8)](https://github.com/ICFI/ADS18f_Alpha/blob/master/testing/mobile/ipad-18f-test-1.png)
* [Samsung Galaxy S5 (Android 4.4)](https://github.com/ICFI/ADS18f_Alpha/blob/master/testing/mobile/galaxy%20s5.png)
* [Samsung Galaxy Note 4 (Android 4.4)](https://github.com/ICFI/ADS18f_Alpha/blob/master/testing/mobile/galaxy-note-18f-test-1.png)
* [Google Nexus 7 tablet (Android 4.4.2)](https://github.com/ICFI/ADS18f_Alpha/blob/master/testing/mobile/nexus-7-18f-test.png)
* [Windows Surface Pro (Windows 8 + IE11)](https://github.com/ICFI/ADS18f_Alpha/blob/master/testing/mobile/ie-device-test.png)

###508
To ensure accessibility, we developed to WCAG 2.0 standards and performed a [508 check](https://github.com/ICFI/ADS18f_Alpha/blob/master/testing/508/medcheck-gov-508-audit.docx) prior to final release. Following the initial 508 testing, we [implemented fixes](https://github.com/ICFI/ADS18f_Alpha/blob/master/testing/508/medcheck-gov-508-audit-recheck.docx) to update our chart legends, as SVG graphics do not provide equivalent information to screen reader users.

###Web Performance
Using [webpagetest.org](http://www.webpagetest.org/) we test our web performance. Key metrics like Time to First Byte, Document Complete, and Server Requests are analyzed. Simple practicies like image optimization or CSS minification can be captured in this step - and corrective action can take place, ensuring an [optimized site for production](https://github.com/ICFI/ADS18f_Alpha/blob/master/testing/performance/webpagetest-perf-18f-test.png).

###Security
With the new standard for [HTTPS implemented on Federal sites](https://https.cio.gov), we built the site to enforce HTTPS connection. After testing the initial server configuration via [SSL Labs](https://www.ssllabs.com/ssltest/), we updated the server with a patch for a weak Diffie-Hellman key exchange, and re-ran the test, moving the site from a ["B"](https://github.com/ICFI/ADS18f_Alpha/blob/master/testing/security/ssl-report-18f-test1.png) to an ["A"](https://github.com/ICFI/ADS18f_Alpha/blob/master/testing/security/ssl-report-18f-test2.png) grade.

##Installation
Please reference our [installation documentation](https://github.com/ICFI/ADS18f_Alpha/blob/master/INSTALL.md).

##Usage
The scenarios we developed were based on chronic diseases familiar to our subject matter experts, utilizing their knowledge of the medications used to treat those conditions. Combined with more common searches like "Children's Tylenol", we covered a broad spectrum of medications and potential side effects. In using the medcheck.gov tool the following scenarios demonstrate the spectrum of responses and side effects.

* Does "Tylenol with Codeine" cause "drowsiness"?
* Does "Xanax" cause "pregnancy"?
* Does "valproic acid" cause "bronchitis"?
* Does "Abacavir Sulfate" cause "vomiting"?

 
