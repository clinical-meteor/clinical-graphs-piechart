

if(Meteor.isClient){
  Meteor.subscribe('reportedOutcomes');
  Session.setDefault('ReportedOutcomesConfig', {
    reportedOutcomesBucketConfig: {
      color: "#45b76f",
      key: "Total"
    }
  });
}


ReportedOutcomes = new Meteor.Collection('reportedOutcomes');
ReportedOutcomes.allow({
  insert: function(){
    return true;
  },
  update: function () {
    return true;
  },
  remove: function(){
    return true;
  }
});



ReportedOutcomes.configure = function(configObject){
  if(Meteor.isClient){
    Session.set('ReportedOutcomesConfig', configObject);
  }
}

if(Meteor.isServer){
  Meteor.publish('reportedOutcomes', function(){
    return ReportedOutcomes.find();
  });
}
