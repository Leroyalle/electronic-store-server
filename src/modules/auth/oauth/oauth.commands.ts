import { OauthAccount } from '@/shared/infrastructure/db/schema/oauth-account.schema';

import { IOauthRepository } from './oauth.repo';

export interface IOauthCommands {
  create(data: Omit<OauthAccount, 'id' | 'createdAt' | 'updatedAt'>): Promise<OauthAccount>;
}

interface Deps {
  repository: IOauthRepository;
}

export class OauthCommands implements IOauthCommands {
  constructor(private readonly deps: Deps) {}

  public create(data: Omit<OauthAccount, 'id' | 'createdAt' | 'updatedAt'>): Promise<OauthAccount> {
    return this.deps.repository.create(data);
  }
}
