#!/usr/bin/env node

const init = function() {
  const yargs = require('yargs');
  const sort = require('./sorting');

  yargs
    .usage('$0 <cmd> [args]')
    .command('sort [source, target]', 'sort files from source to target', (yargs) => {
      yargs.option(
        'source', {
          type: 'string',
          default: './source-folder',
          describe: 'source folder with raw files',
          alias: 's',
        }),
        yargs.option(
          'target', {
            type: 'string',
            default: './target-folder',
            describe: 'target folder with processed files',
            alias: 't',
          })
    }, function (argv) {
      console.log('Sorting began');
      sort();
    })
    .help('help')
    .argv
}

module.exports = init;
