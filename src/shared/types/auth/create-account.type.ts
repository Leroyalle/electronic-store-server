import {
  Account,
  CredentialsAccount,
  OauthAccount,
} from '@/shared/infrastructure/db/schema/account.schema';

import { DistributiveOmit } from '../distributive-omit.type';

export interface ICreateAccount {
  account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>;
  typedAccount: DistributiveOmit<
    OauthAccount | CredentialsAccount,
    'id' | 'createdAt' | 'updatedAt'
  >;
}
