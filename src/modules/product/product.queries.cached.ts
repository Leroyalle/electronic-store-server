import Redis from 'ioredis';

import { RedisKeyPrefix } from '@/shared/constants/redis-key-prefix.constants';
import { Product } from '@/shared/infrastructure/db/schema/product.schema';
import { generateRedisKey } from '@/shared/lib/helpers/generate-redis-key.helper';
import { IPagination } from '@/shared/types/pagination.type';

import { IProductQueries } from './product.queries';

interface Deps {
  redis: Redis;
  productQueries: IProductQueries;
}

export class ProductQueriesCached implements IProductQueries {
  constructor(private readonly deps: Deps) {}

  public async findAll(pagination: IPagination): Promise<Product[]> {
    const redisKey = generateRedisKey(RedisKeyPrefix.PRODUCT, pagination.page, pagination.limit);
    const cachedProducts = await this.deps.redis.get(redisKey);

    if (cachedProducts) {
      const products: Product[] = JSON.parse(cachedProducts);
      return products;
    }

    return this.deps.productQueries.findAll();
  }

  public async findById(id: string): Promise<Product> {
    return this.deps.productQueries.findById(id);
  }
}
