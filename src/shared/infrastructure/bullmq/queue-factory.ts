import { ConnectionOptions, Queue, QueueOptions } from 'bullmq';

export function createQueue(
  queueName: string,
  connection: ConnectionOptions,
  opts?: Omit<QueueOptions, 'connection'>,
) {
  const queue = new Queue(queueName, {
    connection,
    ...opts,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: { age: 24 * 3600 },
    },
  });
}
