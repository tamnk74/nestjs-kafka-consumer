/* istanbul ignore file */
export default {
  type: 'postgres',
  host: process.env['SAMPLE_POSTGRES_HOST'] ?? '127.0.0.1',
  port: process.env['SAMPLE_POSTGRES_PORT'] ?? '5432',
  username: process.env['SAMPLE_POSTGRES_USER'] ?? 'postgres',
  password: process.env['SAMPLE_POSTGRES_PASSWORD'] ?? 'changeme',
  database: process.env['SAMPLE_POSTGRES_DB'] ?? 'nestdb',
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
