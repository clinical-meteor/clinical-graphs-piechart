Meteor.methods({
  incrementReportedOutcomeCount:function(){
    ReportedOutcome.incrementCount();
  }
});
