import { BaseRepository, PaginationResult } from './base-repository';

const baseRepository: BaseRepository<string> = new BaseRepository();

describe('paginate', () => {
  it('should return paginate', async () => {
    const data: Array<string> = ['Data Test'];
    const total = 1;

    // findAndCount function result
    const mockPaginationResultFindAndCount: [string[], number] = [data, 1];

    // pagination function result
    const mockPaginationResult: PaginationResult<string> = {
      data: data,
      total,
    };

    jest
      .spyOn(baseRepository, 'findAndCount')
      .mockResolvedValue(mockPaginationResultFindAndCount);
    const rs = await baseRepository.paginate(1, 24);
    expect(rs).toEqual(mockPaginationResult);
  });

  it('should return default', async () => {
    const data: Array<string> = ['Data Test'];
    const total = 1;

    // findAndCount function result
    const mockPaginationResultFindAndCount: [string[], number] = [data, 1];

    // pagination function result
    const mockPaginationResult: PaginationResult<string> = {
      data: data,
      total,
    };

    jest
      .spyOn(baseRepository, 'findAndCount')
      .mockResolvedValue(mockPaginationResultFindAndCount);
    const rs = await baseRepository.paginate();
    expect(rs).toEqual(mockPaginationResult);
  });
});
