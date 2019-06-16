'use strict'
const yargs = require('yargs/yargs')
const path = require('path')
const directoryFlag = require('./flags/directory')
const envFlag = require('./flags/env')
const logFlag = require('./flags/log')
const requireFlag = require('./flags/require')

module.exports = function (options = {}) {
  const opts = Object.assign({
    commandsDir: path.join(__dirname, 'commands'),
    usage: '$0 <command> [options]'
  }, options)
  const common = commonHandlers(opts)

  const cli = yargs()
    .commandDir(opts.commandsDir, {
      // If commands are functions call them with opts
      visit: (mod) => typeof mod === 'function' ? mod(opts) : mod
    })
    .middleware(common)
    .usage(opts.usage)
    .command('$0', 'Show help', {}, (argv) => {
      common(argv)
      !argv.silent && cli.showHelp()
    })

  // set cols
  cli.wrap(Math.min(cli.terminalWidth(), 120))

  // on fail callback
  if (typeof opts.fail === 'function') {
    cli.fail(opts.fail)
  }

  // Common arguments
  logFlag.builder(cli, opts)
  directoryFlag.builder(cli, opts)
  envFlag.builder(cli, opts)
  requireFlag.builder(cli, opts)

  return (argv) => cli.parse(argv)
}

function commonHandlers (opts = {}) {
  return (argv) => {
    // Run common handlers
    logFlag.handler(argv)
    directoryFlag.handler(argv)
    envFlag.handler(argv)
    requireFlag.handler(argv)
  }
}
