import { PostgresUnitOfWork } from './unit-of-work';
import { Test, TestingModule } from '@nestjs/testing';
import { PostgresTransactionalRepository } from './transactional.repository';
import * as TypeOrm from 'typeorm';
import { BaseRepository } from 'src/common/repositories';

describe('UnitOfWork class', () => {
  let transactionalRepository: PostgresTransactionalRepository;
  let unitOfWork: PostgresUnitOfWork;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        PostgresTransactionalRepository,
        {
          provide: PostgresUnitOfWork,
          useValue: {
            getTransactionManager: jest.fn().mockReturnValue({
              getCustomRepository: jest.fn().mockReturnValue({}),
            }),
            getConnection: jest.fn().mockReturnValue({
              getCustomRepository: jest.fn().mockReturnValue({}),
            }),
          },
        },
      ],
    }).compile();

    transactionalRepository =
      await app.resolve<PostgresTransactionalRepository>(
        PostgresTransactionalRepository,
      );
    unitOfWork = app.get<PostgresUnitOfWork>(PostgresUnitOfWork);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getRepository()', () => {
    it('getRepository should return repository instance', () => {
      @TypeOrm.Entity({ name: 'to-dos' })
      class MockEntity {
        @TypeOrm.PrimaryGeneratedColumn('increment')
        id!: number;

        @TypeOrm.Column()
        title!: string;
      }

      @TypeOrm.EntityRepository(MockEntity)
      class MockRepository extends BaseRepository<MockEntity> {}
      const result = transactionalRepository.getRepository(MockRepository);
      expect(result).toBeInstanceOf(Object);
    });

    it('getRepository should return repository instance when transaction manager is null', () => {
      @TypeOrm.Entity({ name: 'to-dos' })
      class MockEntity {
        @TypeOrm.PrimaryGeneratedColumn('increment')
        id!: number;

        @TypeOrm.Column()
        title!: string;
      }

      @TypeOrm.EntityRepository(MockEntity)
      class MockRepository extends BaseRepository<MockEntity> {}
      jest.spyOn(unitOfWork, 'getTransactionManager').mockReturnValue(null);
      jest.spyOn(TypeOrm, 'getCustomRepository').mockReturnValue({});
      const result = transactionalRepository.getRepository(MockRepository);
      expect(result).toBeInstanceOf(Object);
    });
  });
});
