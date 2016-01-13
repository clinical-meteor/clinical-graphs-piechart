## clinical:graphs-piechart


Reported Outcomes piechart for Meteor ClinicalFramework using D3 and NVD3.  


==========================
####Package Installation  

````bash
meteor add clinical:graphs-piechart
````

Then add the graph to your application with the following.  

````html
{{> ReportedOutcomesChart }}
````  

Note that you can currently only have one ReportedOutcomesChart on the page at a time.  After adding the ReportedOutcomesChart to your document object model, you'll need to subscribe to the collection and render the graph.  The best pattern we've found so far is within the router, like so:

````js
Router.route("/analytics", {
  name:"analyticsRoute",
  template:"analytics",
  waitOn: function () {
    Meteor.subscribe('interactionsDaily');
  },
  onAfterAction: function () {
    Graphs.renderReportedOutcomesStats();
  },
});
````



==========================
#### API  

````js
// isomorphic object
ReportedOutcome.incrementCount("bucketA");

// remote procedure call
Meteor.call('incrementReportedOutcomeCount');
````  


==========================
####Contributions & Licensing  

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
