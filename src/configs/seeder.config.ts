/* istanbul ignore file */
import ormConfig from './orm.config';

export default {
  ...ormConfig,
  migrationsTableName: 'orm_seeeders',
  migrations: ['src/database/seed/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/seed',
  },
};
