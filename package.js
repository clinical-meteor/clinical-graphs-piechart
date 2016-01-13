Package.describe({
  name: 'clinical:graphs-piechart',
  version: '2.5.0',
  summary: 'Piechart for Meteor ClinicalFramework ',
  git: 'https://github.com/clinical-meteor/clinical-graphs-piechart',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');
  api.use('meteor-platform');
  api.use('session');
  api.use('grove:less@0.1.1');
  api.use('d3js:d3@3.5.5');
  api.use('nvd3:nvd3@1.7.1');
  api.use('momentjs:moment@2.10.3');

  api.addFiles('lib/ReportedOutcome.js');
  api.addFiles('lib/ReportedOutcomes.js');

  api.addFiles('components/ReportedOutcomesChart/reportedOutcomesPieChart.js', 'client');

  api.addFiles('components/ReportedOutcomesChart/ReportedOutcomesChart.html', 'client');
  api.addFiles('components/ReportedOutcomesChart/ReportedOutcomesChart.js', 'client');
  api.addFiles('components/ReportedOutcomesChart/ReportedOutcomesChart.less', 'client');

  api.addFiles('server/reported.outcomes.initialize.js', 'server');
  api.addFiles('server/reported.outcomes.observer.js', 'server');
  api.addFiles('server/reported.outcomes.methods.js', 'server');

  api.export('ReportedOutcomes');
  api.export('ReportedOutcome');
  api.export('Graphs');
});

Package.onTest(function (api) {
  api.use('tinytest');
  api.use('clinical:graphs-dailystats');
});
