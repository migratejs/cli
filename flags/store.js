'use strict'
const req = require('../lib/require')

module.exports = {
  builder: function (yargs) {
    yargs.option('store', {
      alias: 's',
      describe: 'Use a migration store',
      type: 'string'
    })
  },
  handler: function (argv) {
    if (!argv.store) {
      return
    }

    argv.store = req(argv.store, argv.cwd)
  }
}
