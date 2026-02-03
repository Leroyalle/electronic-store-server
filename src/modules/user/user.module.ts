import { CreateModuleResult } from '@/shared/types/create-module.result.type';

import { UserCommands } from './user.commands';
import { UserRepo } from './user.repo';
import { createUserRouter } from './user.router';

export function createUserModule(): CreateModuleResult {
  const userRepo = new UserRepo();
  const commands = new UserCommands({
    userRepo: userRepo,
  });

  const router = createUserRouter(commands);

  return { commands, router };
}
