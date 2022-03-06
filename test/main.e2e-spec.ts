import * as newman from 'newman';
import * as glob from 'fast-glob';
import * as async from 'async';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

type HandleFunction = (
  err: Error | null,
  summary: newman.NewmanRunSummary,
) => void;

(async () => {
  const collections = await glob('./test/e2e/**/*.postman_collection.json');
  async.parallel(
    collections.map((collection) => (done: HandleFunction) => {
      newman.run(
        {
          collection: require(`${__dirname}/../${collection}`),
          reporters: ['cli', 'htmlextra'],
          reporter: {
            htmlextra: {
              export: './test/reports/test-results.html',
            },
          },
          globals: {
            values: [
              {
                key: 'host',
                value: process.env['API_DOMAIN'],
              },
              {
                key: 'token',
                value: process.env['TOKEN'],
              },
            ],
          },
          environment: require(`${__dirname}/../test/e2e/chatbot/${process.env['NODE_ENV']}.postman_environment.json`),
        },
        done,
      );
    }),
  );
})();
