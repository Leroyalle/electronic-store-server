import { CreateModuleResult } from '@/shared/types/create-module.result.type';

import { UserCommands } from './user.commands';
import { UserQueries } from './user.queries';
import { UserRepo } from './user.repo';

export function createUserModule(): CreateModuleResult<UserCommands, UserQueries> {
  const userRepo = new UserRepo();
  const commands = new UserCommands({
    userRepo,
  });
  const queries = new UserQueries({ userRepo });

  return { commands, queries };
}
