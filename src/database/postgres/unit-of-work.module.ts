import { forwardRef, Module } from '@nestjs/common';
import { PostgresDatabaseModule } from './connection/database.module';
import { PostgresUnitOfWork } from './unit-of-work';
import { PostgresTransactionalRepository } from './transactional.repository';

export const unitOfWorkProviders = [
  PostgresUnitOfWork,
  PostgresTransactionalRepository,
];

@Module({
  imports: [forwardRef(() => PostgresDatabaseModule)],
  providers: [...unitOfWorkProviders],
  exports: [...unitOfWorkProviders],
})
export class PostgresUnitOfWorkModule {}
