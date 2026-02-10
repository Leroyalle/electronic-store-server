import { ConnectionOptions, Processor, Worker } from 'bullmq';

export function createWorker<T = any, R = void, N extends string = string>(
  name: string,
  processor: Processor<T, R, N>,
  connection: ConnectionOptions,
  opts?: Omit<WorkerOptions, 'connection'>,
) {
  return new Worker<T, R, N>(name, processor, {
    connection,
    ...opts,
    limiter: {
      max: 1,
      duration: 5000,
    },
  });
}
