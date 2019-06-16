'use strict'
const fs = require('fs-extra')
const path = require('path')

module.exports = function dynamicRequire (mod, cwd) {
  let modpath = mod
  if (
    fs.existsSync(mod, { cwd }) ||
    fs.existsSync(`${mod}.js`, { cwd })
  ) {
    modpath = path.resolve(mod)
  }
  return require(require.resolve(modpath, { paths: [cwd] }))
}
