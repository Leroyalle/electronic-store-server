import { ConnectionOptions, Queue } from 'bullmq';

import { BrokerQueues } from '@/shared/constants/broker-queues.constants';
import { TMailQueuePayload, TTgQueuePayload } from '@/shared/types/notification-queue-payload.type';

import { createQueue } from './queue-factory';

type SendEmailFn = <T extends TMailQueuePayload['name']>(
  name: T,
  data: Extract<TMailQueuePayload, { name: T }>['data'],
) => Promise<void>;

type SendTgFn = <T extends TTgQueuePayload['name']>(
  name: T,
  data: Extract<TTgQueuePayload, { name: T }>['data'],
) => Promise<void>;

export interface INotificationProducer {
  sendEmail: SendEmailFn;
  sendAdminTelegramNotification: SendTgFn;
}

export class NotificationProducer implements INotificationProducer {
  private readonly emailQueue: Queue<TMailQueuePayload['data'], any, TMailQueuePayload['name']>;
  private readonly telegramQueue: Queue<TTgQueuePayload['data'], any, TTgQueuePayload['name']>;

  constructor(connection: ConnectionOptions) {
    this.emailQueue = createQueue(BrokerQueues.EMAIL, connection);
    this.telegramQueue = createQueue(BrokerQueues.TELEGRAM, connection);
  }

  public sendEmail: SendEmailFn = async (name, data) => {
    await this.emailQueue.add(name, data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    });
  };

  public sendAdminTelegramNotification: SendTgFn = async (name, data) => {
    await this.telegramQueue.add(name, data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    });
  };
}

// const emailMap: Record<
//   TMailQueuePayload['name'],
//   {
//     subject: string;
//     text: string;
//   }
// > = {
//   verify_email: {
//     subject: 'Подтверждение почты',
//     text: `Ваш верификационный код подтверждения почты -`,
//   },
//   reset_password: {
//     subject: 'Подтверждение сброса пароля',
//     text: `Ваш верификационный код подтверждения сброса пароля -`,
//   },
//   order_confirmed_email: {
//     subject: 'Подтверждение заказа',
//     text: `Ваш заказ подтвержден`,
//   },
// };
