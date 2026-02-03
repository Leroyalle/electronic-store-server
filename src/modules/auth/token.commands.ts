import { RefreshToken } from '@/shared/db/schema/refresh-token.schema';

import { TokenRepo } from './token.repo';

type TokenCommandsDeps = {
  tokenRepo: TokenRepo;
};

export class TokenCommands {
  constructor(private readonly deps: TokenCommandsDeps) {}

  public async create(token: Omit<RefreshToken, 'id'>) {
    return await this.deps.tokenRepo.create(token);
  }
}
