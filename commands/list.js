'use strict'
const storeFlag = require('../flags/store')

module.exports = function (opts) {
  return {
    command: 'list',
    desc: 'List migrations',
    builder: function (yargs) {
      storeFlag.builder(yargs)
    },
    handler: function (argv) {
      storeFlag.handler(argv)
      opts.commandHandler(argv)
    }
  }
}
