// dailyTotal = {
//   color: "#45b76f",
//   key: "DailyTotal"
// }
// bucketAConfig = {
//   color: "#E68A2E",
//   key: "BucketA"
// }
// bucketBConfig = {
//   color: "#80B2FF",
//   key: "BucketB"
// }
// bucketCConfig = {
//   color: "#DB4D4D",
//   key: "BucketC"
// }

Graphs = {
  renderReportedOutcomesStats: function(){
    //console.log('Graphs.renderDailyInteractionsDailyStats');


      // Begin rendering our graph by creating a query object
      // this is usually relevent for scoping the entire graph by date range
      // or by a particular group, organization, client, etc
      //var queryObject = {};

      // var reportedOutcomesConfig = Session.get('ReportedOutcomesConfig');
      // Object.keys(reportedOutcomesConfig).forEach(function(key){
      //
      //   // we fetch our dataset, sort it, and make copies for each line we're going to draw
      //   reportedOutcomesConfig[key].values = ReportedOutcomes.find(queryObject, {sort: {dateIncrement: -1}}).fetch();
      //
      // });
      // Object.keys(reportedOutcomesConfig).forEach(function(key){
      //   reportedOutcomesConfig[key].values.map(function(doc, i){
      //     doc.yAxisValue = doc[key];
      //   });
      // });
      //
      //
      // var graphData = [];
      // Object.keys(reportedOutcomesConfig).forEach(function(key){
      //   graphData.push(reportedOutcomesConfig[key]);
      // });

      // var graphData = ReportedOutcomes.findOne();
      // console.log("graphData", graphData);




      // now we want to define our graph
      var chart;
      nv.addGraph({
        generate: function(){
          //console.log('generating dailyInteractionsReportedOutcomes...');

          // we set some height & width values, apply margins, etc.
          var width = $('#reportedOutcomeStats').width();
          //$('#reportedOutcomeS tats').height($('#reportedOutcomeStatsPanel').height() - 20);
          $('#reportedOutcomeStats').height(400);
          var height = $('#reportedOutcomeStats').height();
          var height = 380;
          var width = width - 40;

          // this defines how we're going to draw the data
          var chart = nv.models.pieChart()
              .x(function(d) { return d.label })
              .y(function(d) { return d.value })
              .showLabels(true)     //Display pie labels
              .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
              .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
              .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
              .donutRatio(0.35)     //Configure how big you want the donut hole size to be.


          // and this is the  function that actually draws everything
          d3.select('#reportedOutcomeStats svg')
            .attr('width', width)
            .attr('height', height)
            .datum(ReportedOutcomes.findOne().bucket)
            .transition().duration(350)
            .call(chart);

          nv.utils.windowResize(chart.update);

          //chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

          return chart;
        },
        callback: function(graph){
          window.onresize = function () {
            var width = $('#reportedOutcomeStats').width();
            var height =  $('#reportedOutcomeStats').height();
            var margin = graph.margin();

            if (width < margin.left + margin.right + 20){
              width = margin.left + margin.right + 20;
            }else{
              width = width - 40;
            }

            if (height < margin.top + margin.bottom + 20){
              height = margin.top + margin.bottom + 20;
            }
            if(height > 380){
              height = 380;
            }

            graph.width(width).height(height);

            d3.select('#reportedOutcomeStats svg')
              .attr('width', width)
              .attr('height', height)
              .call(graph);
          };
        }
      });
    //}
  }
}
