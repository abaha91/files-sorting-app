#!/usr/bin/env node

const yargs = require('yargs');
const sort = require('./index.js');

yargs
  .usage('$0 <cmd> [args]')
  .command('sort [removing]', 'sort files from ./source-folder', (yargs) => {
    yargs.positional('name', {
      type: 'boolean',
      default: false,
      describe: 'if true the source-folder will be removing'
    })
  }, function (argv) {
    console.log('Sorting began');
    sort();
  })
  .help()
  .argv