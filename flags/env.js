'use strict'
const dotenv = require('dotenv')
const path = require('path')

module.exports = {
  builder: function (yargs, opts = {}) {
    yargs.option('env', Object.assign({
      alias: 'e',
      describe: 'Use dotenv to load an environment file',
      defaultDescription: '.env'
    }, opts))
  },
  handler: function (argv) {
    let env = argv.env
    if (!argv.env || env === true) {
      env = '.env'
    }

    try {
      const e = dotenv.config({
        path: path.resolve(env)
      })
      if (e && e.error instanceof Error) {
        throw e.error
      }
    } catch (e) {
      // Only throw if the flag was passed
      if (argv.env) {
        throw e
      }
    }
  }
}
