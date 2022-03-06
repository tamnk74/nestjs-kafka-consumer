#!/usr/bin/env node
/* istanbul ignore file */

import yargs from 'yargs/yargs';
import { exportError } from './errors/error.export';

yargs(process.argv.slice(2))
  .command(
    'export [name]',
    'Export error list command!',
    (yarg) => {
      yarg.positional('name', {
        type: 'string',
        default: 'error',
        describe: 'the file name to export',
      });
    },
    exportError,
  )
  .help()
  .parse();
