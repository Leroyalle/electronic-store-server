import { eq } from 'drizzle-orm';

import { db } from '@/shared/infrastructure/db/client';
import {
  Account,
  accountSchema,
  AccountWithRelations,
  credentialsAccountSchema,
  oauthAccountSchema,
} from '@/shared/infrastructure/db/schema/account.schema';
import { ICreateAccount, IUpdateAccount } from '@/shared/types/auth/create-account.type';

export interface IAccountRepository {
  findById(id: string): Promise<AccountWithRelations | undefined>;
  create(data: Omit<ICreateAccount, 'id' | 'createdAt' | 'updatedAt'>): Promise<Account>;
  update(id: string, data: IUpdateAccount): Promise<Account>;
}

export class AccountRepo implements IAccountRepository {
  public async findById(id: string): Promise<AccountWithRelations | undefined> {
    return await db.query.accountSchema.findFirst({
      where: eq(accountSchema.id, id),
      with: {
        oauthAccount: true,
        credentialsAccount: true,
      },
    });
  }

  public async update(id: string, data: IUpdateAccount): Promise<Account> {
    const [updatedAccount] = await db
      .update(accountSchema)
      .set(data.account)
      .where(eq(accountSchema.id, id))
      .returning();

    if (data.providerDetails.type === 'oauth') {
      await db
        .update(oauthAccountSchema)
        .set(data.providerDetails)
        .where(eq(oauthAccountSchema.accountId, updatedAccount.id));
    } else if (data.providerDetails.type === 'credentials') {
      await db
        .update(credentialsAccountSchema)
        .set(data.providerDetails)
        .where(eq(credentialsAccountSchema.accountId, updatedAccount.id));
    }

    return updatedAccount;
  }

  public async create(
    data: Omit<ICreateAccount, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Account> {
    return db.transaction(async tx => {
      const [account] = await tx.insert(accountSchema).values(data.account).returning();

      if (data.providerDetails.type === 'oauth') {
        await tx
          .insert(oauthAccountSchema)
          .values({
            providerAccountId: data.providerDetails.providerAccountId,
            accountId: account.id,
          })
          .returning();
      } else if (data.providerDetails.type === 'credentials') {
        await tx
          .insert(credentialsAccountSchema)
          .values({
            accountId: account.id,
            password: data.providerDetails.password,
          })
          .returning();
      }

      return account;
    });
  }
}
