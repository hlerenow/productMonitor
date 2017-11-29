var log4js = require('log4js');

log4js.configure({
  appenders: {
    everything: { type: 'dateFile', filename: './logs/all-the-logs.log', pattern: '.yyyy-MM-dd', compress: true }
  },
  categories: {
    default: { appenders: [ 'everything' ], level: 'info'}
  }
});

var logger = log4js.getLogger('everything');
logger.level = 'info';
module.exports = exports = logger.info.bind(logger);