'use strict'
const storeFlag = require('../flags/store')
const templateFlag = require('../flags/template')

module.exports = function (opts) {
  return {
    command: 'init',
    desc: 'Initalize migrations in a project',
    builder: function (yargs) {
      storeFlag.builder(yargs)
      templateFlag.builder(yargs)
    },
    handler: function (argv) {
      storeFlag.handler(argv)
      templateFlag.handler(argv)
      opts.commandHandler(argv)
    }
  }
}
