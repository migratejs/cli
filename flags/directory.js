'use strict'

module.exports = {
  builder: function (yargs, opts = {}) {
    yargs.option('cwd', Object.assign({
      alias: 'c',
      describe: 'Change the working directory',
      defaultDescription: process.cwd(),
      type: 'string',
      normalize: true
    }, opts))
  },
  handler: function (argv) {
    if (!argv.cwd) {
      return
    }
    process.chdir(argv.cwd)
  }
}
