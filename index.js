#!/usr/bin/env node

'use strict'

const pkg = require('./package.json')
const pugssml_pkg = require('pug-ssml/package.json')
// const fs = require('fs')
// const path = require('path')
const program = require('commander')
const chalk = require('chalk')
const pug = require('pug-ssml')

// const basename = path.basename
// const dirname = path.dirname
// const resolve = path.resolve
// const normalize = path.normalize
// const join = path.join
// const relative = path.relative

program
  .version(`
    pug-ssml version: ${pkg.version}
    pug-ssml-cli version: ${pugssml_pkg.version}
  `)
  .usage('[options] [dir|file ...]')
  .option('-t, --templates <dir>', 'The source templates directory.')
  .option('-f, --file [str]', 'The name of the generated JavaScript module.  Defaults to ./ssml-speech.js')
  .option('-o, --out [dir]', 'The directory for the generated JavaScript module. Defaults to cwd.')
  .option('-r, --relative [path]', 'The filename used to resolve relative pug includes')
  .option('-P, --pretty', 'Pug option to generate pretty output, defaults to false.')
  .option('-D, --no-debug', 'Pug option to exclude debug information.')
  .option('-s, --silent', 'do not output logs')
  .parse(process.argv)

// program.on('--help', function() {
//   console.log('  Examples:')
//   console.log('')
//   console.log('    # Render all files in the `templates` directory:')
//   console.log('    $ pug templates')
//   console.log('')
//   console.log('    # Create {foo,bar}.html:')
//   console.log('    $ pug {foo,bar}.pug')
//   console.log('')
//   console.log('    # Using `pug` over standard input and output streams')
//   console.log('    $ pug < my.pug > my.html')
//   console.log('    $ echo \'h1 Pug!\' | pug')
//   console.log('')
//   console.log('    # Render all files in `foo` and `bar` directories to `/tmp`:')
//   console.log('    $ pug foo bar --out /tmp')
//   console.log('')
//   console.log('    # Specify options through a string:')
//   console.log('    $ pug -O \'{"doctype": "html"}\' foo.pug')
//   console.log('    # or, using JavaScript instead of JSON')
//   console.log('    $ pug -O "{doctype: \'html\'}" foo.pug')
//   console.log('')
//   console.log('    # Specify options through a file:')
//   console.log('    $ echo "exports.doctype = \'html\'" > options.js')
//   console.log('    $ pug -O options.js foo.pug')
//   console.log('    # or, JSON works too')
//   console.log('    $ echo \'{"doctype": "html"}\' > options.json')
//   console.log('    $ pug -O options.json foo.pug')
//   console.log('')
// })

program.parse(process.argv)

const log = program.silent ? function() {} : console.log

if (!program.templates) {
  log(chalk.red('A templates directory must be specified.'))
  process.exit(0)
}

const options = {
  basedir: "./node_modules/pug-ssml-cli",
  compileDebug: program.debug,
  pretty:  program.pretty === true
}

const file = program.file ? program.file : 'ssml-speech.js'
const output = program.out ? program.out : '.'

try {
  pug.precompile(program.templates, options)
  log(chalk.green(`Successfully created module: ${output}/${file}`))
} catch (err) {
  console.log(chalk.red(`Exception while compiling templates: ${err}`))
}
