import { JwtConfig } from './jwt.config';

export class TokenService {
  constructor(private readonly jwtConfig: JwtConfig) {}

  public generate() {}
}
