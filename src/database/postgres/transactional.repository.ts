import { Injectable, Scope } from '@nestjs/common';
import { ObjectType, Repository } from 'typeorm';
import { PostgresUnitOfWork } from './unit-of-work';
import { BaseRepository } from '../../common/repositories';

@Injectable({ scope: Scope.REQUEST })
export class PostgresTransactionalRepository {
  constructor(private uow: PostgresUnitOfWork) {}
  /**
   * Gets a repository bound to the current transaction manager
   * or defaults to the current connection's call to getRepository().
   */
  getRepository<Entity>(
    repository: ObjectType<Repository<Entity>>,
  ): BaseRepository<Entity> {
    const transactionManager = this.uow.getTransactionManager();
    if (transactionManager) {
      return transactionManager.getCustomRepository(
        repository,
      ) as BaseRepository<Entity>;
    }
    return this.uow
      .getConnection()
      .getCustomRepository(repository) as BaseRepository<Entity>;
  }
}
