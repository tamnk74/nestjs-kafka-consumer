import { PostgresUnitOfWork } from './unit-of-work';
import { Test, TestingModule } from '@nestjs/testing';
import { SAMPLE_POSTGRES_CONNECTION } from './constants';

describe('UnitOfWork class', () => {
  let unitOfWork: PostgresUnitOfWork;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        PostgresUnitOfWork,
        {
          provide: SAMPLE_POSTGRES_CONNECTION,
          useValue: {
            createQueryRunner: jest.fn().mockReturnValue({
              startTransaction: jest.fn().mockReturnValue({}),
              manager: {},
              commitTransaction: jest.fn().mockReturnValue({}),
              rollbackTransaction: jest.fn().mockReturnValue({}),
              release: jest.fn().mockReturnValue({}),
            }),
          },
        },
      ],
    }).compile();

    unitOfWork = await app.resolve<PostgresUnitOfWork>(PostgresUnitOfWork);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('getTransactionManager should return null', () => {
    const transactionManager = unitOfWork.getTransactionManager();
    expect(transactionManager).toBeNull();
  });

  it('getConnection should return connection object', () => {
    const connnection = unitOfWork.getConnection();
    expect(connnection).toBeInstanceOf(Object);
  });
  describe('withTransaction()', () => {
    it('withTransaction should return object', async () => {
      const result = await unitOfWork.withTransaction(async () => 'hello');
      expect(result).toEqual('hello');
    });

    it('withTransaction should throw error', async () => {
      await expect(
        unitOfWork.withTransaction(async () => {
          throw new Error('sample error');
        }),
      ).rejects.toThrow();
    });
  });
});
