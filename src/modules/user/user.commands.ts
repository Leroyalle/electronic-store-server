import { User } from '@/shared/db/schema/user.schema';

import { IUserRepository } from './user.repo';

export type UserDeps = {
  userRepo: IUserRepository;
};

export class UserCommands {
  constructor(private deps: UserDeps) {}

  public findByEmail(email: string) {
    return this.deps.userRepo.findByEmail(email);
  }

  public create(user: User) {
    return this.deps.userRepo.create(user);
  }

  public findById(id: string) {
    return this.deps.userRepo.findById(id);
  }
}
