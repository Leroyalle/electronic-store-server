import { createWorker } from '@/shared/infrastructure/bullmq/worker-factory';
import { TAuthQueuePayload } from '@/shared/types/auth-queue-payload.type';
import { ISendEmailPayload } from '@/shared/types/send-email-payload.type';

import { IMailerService } from './mailer.service';

interface Deps {
  service: IMailerService;
}

export function createConsumer(deps: Deps) {
  const consumer = createWorker<TAuthQueuePayload['data'], void, TAuthQueuePayload['name']>(
    'auth',
    async job => {
      switch (job.name) {
        case 'verify_email':
          const data = job.data as Extract<TAuthQueuePayload, { name: 'verify_email' }>['data'];
          const payload: ISendEmailPayload = {
            to: data.email,
            subject: 'Verify your email',
            text: `Ваш верификационный код подтверждения почты - ${data.code}`,
          };
          return await deps.service.send(payload);
        default:
          throw new Error(`Job ${job.name} is not handled in Auth Worker`);
      }
    },
    {},
  );

  return consumer;
}
