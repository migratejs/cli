'use strict'
const req = require('../lib/require')

module.exports = {
  builder: function (yargs, opts = {}) {
    yargs.option('require', Object.assign({
      alias: 'r',
      describe: 'Require a module (ex. -r @babel/register)',
      type: 'array'
    }, opts))
  },
  handler: function (argv) {
    if (!argv.require) {
      return
    }

    argv.require.forEach((mod) => req(mod, argv.cwd))
  }
}
