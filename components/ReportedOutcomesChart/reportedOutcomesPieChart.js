

Graphs = {
  renderReportedOutcomesStats: function(){
    //console.log('Graphs.renderDailyInteractionsDailyStats');

      Tracker.autorun(function(){
        var graphData = [{
          "label": "One",
          "value" : 0
        },
        {
          "label": "Two",
          "value" : 0
        },
        {
          "label": "Three",
          "value" : 0
        }];

        var rawData = ReportedOutcomes.findOne({_id: Session.get('activeReportedOutcomeId')});
        if (rawData) {
          graphData = rawData.bucket;
        }
        console.log("graphData", graphData);

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
                .datum(graphData)
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

      });

  }
}
