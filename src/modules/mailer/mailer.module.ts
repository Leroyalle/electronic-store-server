import Redis from 'ioredis';

import { createMailerClient } from '@/shared/infrastructure/mailer/client-factory';

import { createConsumer } from './mailer.consumer';
import { MailerService } from './mailer.service';

interface Deps {
  redis: Redis;
}

export function createMailerModule(deps: Deps) {
  const client = createMailerClient();
  const service = new MailerService(client);
  const consumer = createConsumer({ service, redis: deps.redis });
  return { service, consumer };
}
