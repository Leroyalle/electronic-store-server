import { eq } from 'drizzle-orm';

import { db } from '@/shared/infrastructure/db/client';
import {
  OauthAccount,
  oauthAccountSchema,
} from '@/shared/infrastructure/db/schema/oauth-account.schema';

interface IOAuthRepository {
  findById(id: string): Promise<OauthAccount | undefined>;
}

export class OAuthRepo implements IOAuthRepository {
  public async findById(id: string): Promise<OauthAccount | undefined> {
    return await db.query.oauthAccountSchema.findFirst({ where: eq(oauthAccountSchema.id, id) });
  }
}
