import { createMailerClient } from '@/shared/infrastructure/mailer/client-factory';

import { createConsumer } from './mailer.consumer';
import { MailerService } from './mailer.service';

export function createMailerModule() {
  const client = createMailerClient();
  const service = new MailerService(client);
  const consumer = createConsumer({ service });
  return { service, worker: consumer };
}
