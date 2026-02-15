import { AccountWithRelations } from '@/shared/infrastructure/db/schema/account.schema';

import { IAccountRepository } from './account.repo';

export interface IAccountQueries {
  findByProviderId(
    id: string,
  ): Promise<Omit<AccountWithRelations, 'credentialsAccount'> | undefined>;
  findById(id: string): Promise<AccountWithRelations | undefined>;
}

interface Deps {
  repository: IAccountRepository;
}

export class AccountQueries implements IAccountQueries {
  constructor(private readonly deps: Deps) {}

  public findById(id: string): Promise<AccountWithRelations | undefined> {
    return this.deps.repository.findById(id);
  }

  public findByProviderId(
    id: string,
  ): Promise<Omit<AccountWithRelations, 'credentialsAccount'> | undefined> {
    return this.deps.repository.findByProviderId(id);
  }
}
