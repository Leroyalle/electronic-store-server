import { and, eq } from 'drizzle-orm';

import { db } from '@/shared/infrastructure/db/client';
import { AuthCode, authCodeSchema } from '@/shared/infrastructure/db/schema/auth-code.schema';

export interface ICodeRepository {
  create(data: Pick<AuthCode, 'code' | 'userId' | 'type'>): Promise<AuthCode>;
  findByUserId(data: Pick<AuthCode, 'code' | 'userId' | 'type'>): Promise<AuthCode | undefined>;
}

export class CodeRepo implements ICodeRepository {
  public async create(data: Pick<AuthCode, 'code' | 'userId' | 'type'>): Promise<AuthCode> {
    return (await db.insert(authCodeSchema).values(data).returning())[0];
  }

  public async findByUserId(
    data: Pick<AuthCode, 'code' | 'userId' | 'type'>,
  ): Promise<AuthCode | undefined> {
    return await db.query.authCodeSchema.findFirst({
      where: and(
        eq(authCodeSchema.userId, data.userId),
        eq(authCodeSchema.type, data.type),
        eq(authCodeSchema.code, data.code),
      ),
    });
  }
}
