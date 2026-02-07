import Redis from 'ioredis';

import { getEnv } from '@/shared/lib/helpers/get-env.helper';

export const redis = new Redis(getEnv('REDIS_URL'));
