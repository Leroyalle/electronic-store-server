import { AuthCode } from '@/shared/infrastructure/db/schema/auth-code.schema';

import { ICodeRepository } from './code.repo';

interface Deps {
  codeRepo: ICodeRepository;
}

export class CodeQueries {
  constructor(private readonly deps: Deps) {}

  public findByUserId(data: Pick<AuthCode, 'code' | 'userId' | 'type'>) {
    return this.deps.codeRepo.findByUserId(data);
  }
}
