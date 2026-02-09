import Redis from 'ioredis';

import { getEnv } from '@/shared/lib/helpers/get-env.helper';

export const redis = new Redis({
  host: getEnv('REDIS_HOST'),
  port: parseInt(getEnv('REDIS_PORT')),
  password: getEnv('REDIS_PASSWORD'),
  username: getEnv('REDIS_USER'),
  maxRetriesPerRequest: null,
});

redis.on('connect', () => {
  console.log('🚀 Redis: Успешно подключено к серверу');
});

redis.on('ready', () => {
  console.log('✅ Redis: Готов к приему команд');
});

redis.on('error', err => {
  console.error('❌ Redis: Ошибка подключения:', err.message);
});
