#!/usr/bin/env node
/* eslint-disable no-console */
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as commonException from 'src/exceptions/common.exception';

type Args = {
  name?: string;
};

export function exportError(argv: Args): void {
  const masterErrors = {
    ...commonException,
  };
  const errors = Object.keys(masterErrors).map((exceptionKey: string) => {
    return new masterErrors[exceptionKey as keyof typeof masterErrors]();
  });

  ejs.renderFile(
    './src/cli/errors/template.html',
    { errors },
    {},
    (err: Error | null, errorHtml: string): void => {
      if (err) {
        console.error(err);
        return;
      }

      fs.writeFileSync(`./src/cli/exports/${argv.name}.html`, errorHtml);
      console.log(
        `Done export error to file ./src/cli/exports/${argv.name}.html`,
      );
    },
  );
}
