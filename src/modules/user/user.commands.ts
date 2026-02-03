import { User } from '@/shared/db/schema/user.schema';

import { IUserRepository } from './user.repo';

export type UserCommandsDeps = {
  userRepo: IUserRepository;
};

export class UserCommands {
  constructor(private deps: UserCommandsDeps) {}

  public create(user: User) {
    return this.deps.userRepo.create(user);
  }
}
