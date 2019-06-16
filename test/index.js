'use strict'
const { describe, it, beforeEach } = require('mocha')
const assert = require('assert')
const path = require('path')
const fs = require('fs-extra')
const pkg = require('../package.json')
const cli = require('..')

const TMP_DIR = path.join(__dirname, 'fixtures', 'tmp')
const ENV_DIR = path.join(__dirname, 'fixtures', 'env')
const REQ_DIR = path.join(__dirname, 'fixtures', 'require')
const TMPL_DIR = path.join(__dirname, 'fixtures', 'template')

const cwd = process.cwd()
describe(pkg.name, () => {
  beforeEach(async () => {
    process.chdir(cwd)
    await fs.remove(TMP_DIR)
    await fs.mkdirp(TMP_DIR)
  })

  describe('flags', () => {
    it('--cwd', () => {
      const arg = cli()(['--silent', '--cwd', TMP_DIR])
      assert.strictEqual(arg.cwd, TMP_DIR)
      assert.strictEqual(process.cwd(), TMP_DIR)
    })

    it('--env', () => {
      const arg = cli()(['--silent', '--cwd', ENV_DIR])
      assert.strictEqual(arg.cwd, ENV_DIR)
      assert.strictEqual(process.cwd(), ENV_DIR)
      assert.strictEqual(process.env.DB_PASS, 'migratejs')
      delete process.env.DB_PASS

      assert.strictEqual(process.env.DB_PASS, undefined)
      cli()(['--silent', '--cwd', ENV_DIR, '--env'])
      assert.strictEqual(process.env.DB_PASS, 'migratejs')
      delete process.env.DB_PASS

      assert.strictEqual(process.env.DB_PASS, undefined)
      cli()(['--silent', '--cwd', ENV_DIR, '--env=.env'])
      assert.strictEqual(process.env.DB_PASS, 'migratejs')
      delete process.env.DB_PASS

      assert.strictEqual(process.env.DB_PASS, undefined)
      cli()(['--silent', '--cwd', ENV_DIR, '--env', '.env-other'])
      assert.strictEqual(process.env.DB_PASS, 'other')
      delete process.env.DB_PASS

      assert.throws(() => {
        cli()(['--silent', '--cwd', ENV_DIR, '--env', '.env-missing'])
      })
    })

    it('--require', () => {
      cli()(['--silent', '--cwd', REQ_DIR, '--require', 'req'])
      assert.strictEqual(process.env.MIGRATEJS, 'required')
      delete process.env.MIGRATEJS
      delete require.cache[require.resolve(path.join(REQ_DIR, 'req'))]

      assert.strictEqual(process.env.MIGRATEJS, undefined)
      cli()(['--silent', '--cwd', REQ_DIR, '--require', 'req.js'])
      assert.strictEqual(process.env.MIGRATEJS, 'required')
      delete process.env.MIGRATEJS
      delete require.cache[require.resolve(path.join(REQ_DIR, 'req'))]

      assert.strictEqual(process.env.MIGRATEJS, undefined)
      cli()(['--silent', '--cwd', REQ_DIR, '--require', 'register'])
      assert.strictEqual(process.env.MIGRATEJS, 'registered')
      delete process.env.MIGRATEJS

      assert.throws(() => {
        cli()(['--silent', '--cwd', REQ_DIR, '--require', 'none'])
      })
    })
  })

  describe('commands', () => {
    describe('init', () => {
      it('run handler', () => {
        let called = false
        cli({
          commandHandler: (argv) => {
            assert.strictEqual(called, false)
            called = true

            assert.strictEqual(argv.store, undefined)
            assert.strictEqual(argv.template, undefined)
          }
        })(['init', '--silent', '--cwd', REQ_DIR])
        assert.strictEqual(called, true)
      })

      it('--template', () => {
        cli({
          commandHandler: (argv) => {
            assert.strictEqual(typeof argv.template, 'function')
          }
        })(['init', '--silent', '--cwd', TMPL_DIR, '--template', 'tmpl'])
      })

      it('--store', () => {
        cli({
          commandHandler: (argv) => {
            assert.strictEqual(typeof argv.store, 'function')
          }
        })(['init', '--silent', '--cwd', TMPL_DIR, '--store', 'tmpl'])
      })
    })

    describe('create', () => {
      it('run handler', () => {
        let called = false
        cli({
          commandHandler: (argv) => {
            assert.strictEqual(called, false)
            called = true

            assert.strictEqual(argv.store, undefined)
            assert.strictEqual(argv.template, undefined)
          }
        })(['create', '--silent', '--cwd', REQ_DIR])
        assert.strictEqual(called, true)
      })

      it('--template', () => {
        cli({
          commandHandler: (argv) => {
            assert.strictEqual(typeof argv.template, 'function')
          }
        })(['create', '--silent', '--cwd', TMPL_DIR, '--template', 'tmpl'])
      })

      it('--store', () => {
        cli({
          commandHandler: (argv) => {
            assert.strictEqual(typeof argv.store, 'function')
          }
        })(['create', '--silent', '--cwd', TMPL_DIR, '--store', 'tmpl'])
      })
    })

    describe('list', () => {
      it('run handler', () => {
        let called = false
        cli({
          commandHandler: (argv) => {
            assert.strictEqual(called, false)
            called = true

            assert.strictEqual(argv.store, undefined)
          }
        })(['list', '--silent', '--cwd', REQ_DIR])
        assert.strictEqual(called, true)
      })

      it('--store', () => {
        cli({
          commandHandler: (argv) => {
            assert.strictEqual(typeof argv.store, 'function')
          }
        })(['list', '--silent', '--cwd', TMPL_DIR, '--store', 'tmpl'])
      })
    })

    describe('up', () => {
      it('run handler', () => {
        let called = false
        cli({
          commandHandler: (argv) => {
            assert.strictEqual(called, false)
            called = true

            assert.strictEqual(argv.store, undefined)
          }
        })(['up', '--silent', '--cwd', REQ_DIR])
        assert.strictEqual(called, true)
      })

      it('--store', () => {
        cli({
          commandHandler: (argv) => {
            assert.strictEqual(typeof argv.store, 'function')
          }
        })(['up', '--silent', '--cwd', TMPL_DIR, '--store', 'tmpl'])
      })
    })

    describe('down', () => {
      it('run handler', () => {
        let called = false
        cli({
          commandHandler: (argv) => {
            assert.strictEqual(called, false)
            called = true

            assert.strictEqual(argv.store, undefined)
          }
        })(['down', '--silent', '--cwd', REQ_DIR])
        assert.strictEqual(called, true)
      })

      it('--store', () => {
        cli({
          commandHandler: (argv) => {
            assert.strictEqual(typeof argv.store, 'function')
          }
        })(['down', '--silent', '--cwd', TMPL_DIR, '--store', 'tmpl'])
      })
    })
  })
})
