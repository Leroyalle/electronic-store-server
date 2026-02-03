import { User } from '@/shared/db/schema/user.schema';

import { UserCommands } from '../user/user.commands';
import { UserQueries } from '../user/user.queries';

export interface AuthCommandsDeps {
  userQueries: UserQueries;
  userCommands: UserCommands;
}

export class AuthCommands {
  constructor(private readonly deps: AuthCommandsDeps) {}

  public async register(input: Omit<User, 'id'>): { status: 'success' | 'error'; message: string } {
    const findUser = await this.deps.userQueries.findByEmail(input.email);
    if (!findUser)
      return { status: 'error', message: 'Пользователь с данным email уже существует' };

    const createdUser = await this.deps.userCommands.create(input);

    return { status: 'success', message: 'Вы успешно зарегестрированы!' };
  }

  // public authorize() {}
}
