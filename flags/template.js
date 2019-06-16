'use strict'
const req = require('../lib/require')

module.exports = {
  builder: function (yargs) {
    yargs.option('template', {
      alias: 't',
      describe: 'Use migration template generator',
      type: 'string'
    })
  },
  handler: function (argv) {
    if (!argv.template) {
      return
    }

    argv.template = req(argv.template, argv.cwd)
  }
}
