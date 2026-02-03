import { UserRepo } from './user.repo';

export type UserQueriesDeps = {
  userRepo: UserRepo;
};

export class UserQueries {
  constructor(private readonly deps: UserQueriesDeps) {}

  public findByEmail(email: string) {
    return this.deps.userRepo.findByEmail(email);
  }

  public findById(id: string) {
    return this.deps.userRepo.findById(id);
  }
}
