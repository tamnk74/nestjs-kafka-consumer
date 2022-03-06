import { EntityRepository, Repository } from 'typeorm';

export type PaginationResult<T> = {
  data: T[];
  total: number;
};

@EntityRepository()
export class BaseRepository<T> extends Repository<T> {
  async paginate(page = 1, perPage = 25): Promise<PaginationResult<T>> {
    const [result, total] = await this.findAndCount({
      take: perPage,
      skip: perPage * (page - 1),
    });

    return {
      data: result,
      total: total,
    };
  }
}
