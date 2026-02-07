import { db } from '@/shared/infrastructure/db/client';
import { CreateModuleResult } from '@/shared/types/create-module.result.type';

import { DataCounterCommands } from './data-counter.commands';
import { DataCounterQueries } from './data-counter.queries';
import { DataCounterRepository } from './data-counter.repo';

export function createDataCounterModule(): CreateModuleResult<
  DataCounterCommands,
  DataCounterQueries
> {
  const repository = new DataCounterRepository({ db: db });
  const queries = new DataCounterQueries({ repository });
  const commands = new DataCounterCommands({ repository });

  return {
    commands,
    queries,
  };
}
