/* istanbul ignore file */
import { Connection, createConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SAMPLE_POSTGRES_CONNECTION } from '../constants';

export const databaseProviders = [
  {
    provide: SAMPLE_POSTGRES_CONNECTION,
    useFactory: async (configService: ConfigService): Promise<Connection> => {
      return createConnection({
        type: 'postgres',
        host: configService.get('SAMPLE_POSTGRES_HOST'),
        port: +configService.get('SAMPLE_POSTGRES_PORT'),
        username: configService.get('SAMPLE_POSTGRES_USER'),
        password: configService.get('SAMPLE_POSTGRES_PASSWORD'),
        database: configService.get('SAMPLE_POSTGRES_DB'),
        entities: [],
        migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
        synchronize: true,
        migrationsRun: true,
        logging: configService.get('DEBUG', false),
      });
    },
    inject: [ConfigService],
  },
];
