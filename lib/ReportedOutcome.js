ReportedOutcome = {
  // the simple count incrementer
  incrementCount: function(){
    if(Meteor.isServer){
      var todaySats = ReportedOutcomes.find({dateIncrement: moment().format('YYYYMMDD')});

      if(todaySats.count() === 0){
        ReportedOutcomes.insert({
          date: moment().format("MM-DD-YYYY"),
          dateIncrement: moment().format('YYYYMMDD'),
          daily_total: 1
        });
      }else{
        todaySats.forEach(function(doc){
          ReportedOutcomes.update({_id: doc._id}, {$inc: {
            daily_total: 1
          }});
        });
      }
    }else{
      console.log("Need to run StatsCounter.incrementTodayCount() on server!");
    }
  },
  // // the advanced count increment (which uses a dynamic key)
  // incrementCount: function(bucketName){
  //   var todaySats = ReportedOutcomes.find({dateIncrement: moment().format('YYYYMMDD')});
  //
  //   if(todaySats.count() === 0){
  //     // we start by creating an object literal
  //     var newRecord = {
  //       date: moment().format("MM-DD-YYYY"),
  //       dateIncrement: moment().format('YYYYMMDD'),
  //       daily_total: 1
  //     };
  //     // then we attach a key/value using bracket notation
  //     newRecord[bucketName] = 1;
  //
  //     // then we insert
  //     ReportedOutcomes.insert(newRecord);
  //   }else{
  //     todaySats.forEach(function(doc){
  //       // same basic process for the $inc
  //       // but here we contruct a query object using an object literal and brackets
  //       var queryUpdate = {};
  //       queryUpdate[bucketName] = 1;
  //       ReportedOutcomes.update({_id: doc._id}, {$inc: queryUpdate });
  //     });
  //   }
  // }
};
