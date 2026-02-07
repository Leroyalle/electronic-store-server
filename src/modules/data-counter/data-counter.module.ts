import { DB } from '@/shared/infrastructure/db/client';
import { CreateModuleResult } from '@/shared/types/create-module.result.type';

import { DataCounterCommands } from './data-counter.commands';
import { DataCounterQueries } from './data-counter.queries';
import { DataCounterRepository } from './data-counter.repo';

interface Deps {
  db: DB;
}

export function createDataCounterModule(
  deps: Deps,
): CreateModuleResult<DataCounterCommands, DataCounterQueries> {
  const repository = new DataCounterRepository({ db: deps.db });
  const queries = new DataCounterQueries({ repository });
  const commands = new DataCounterCommands({ repository });

  return {
    commands,
    queries,
  };
}
