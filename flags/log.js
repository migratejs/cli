'use strict'

module.exports = {
  builder: function (yargs) {
    yargs.option('logger', {
      describe: 'Set the logger',
      type: 'string',
      group: 'Logging:'
    })
    yargs.option('level', {
      alias: 'l',
      describe: 'Set the log level',
      type: 'string',
      group: 'Logging:'
    })
    yargs.option('silent', {
      describe: 'Surpress all output',
      group: 'Logging:'
    })
    yargs.option('verbose', {
      alias: 'v',
      describe: 'Verbose output',
      group: 'Logging:'
    })
    yargs.conflicts({
      'verbose': 'silent',
      'silent': 'verbose',
      'log-level': ['silent', 'verbose'],
      group: 'Logging:'
    })
  },
  handler: function (argv) {
    // @TODO create or load logger
  }
}
