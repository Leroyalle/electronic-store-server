import Redis from 'ioredis';

import { AuthCode } from '@/shared/infrastructure/db/schema/auth-code.schema';

interface Deps {
  redis: Redis;
}

export class CodeQueries {
  constructor(private readonly deps: Deps) {}

  public async findByUserId(data: Pick<AuthCode, 'code' | 'userId' | 'type'>) {
    return await this.deps.redis.get(`auth:code:${data.type}:${data.userId}`);
  }
}
