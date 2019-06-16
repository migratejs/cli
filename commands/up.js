'use strict'
const storeFlag = require('../flags/store')

module.exports = function (opts) {
  return {
    command: 'up',
    desc: 'Run migrations up',
    builder: function (yargs) {
      storeFlag.builder(yargs)
    },
    handler: function (argv) {
      storeFlag.handler(argv)
      opts.commandHandler(argv)
    }
  }
}
