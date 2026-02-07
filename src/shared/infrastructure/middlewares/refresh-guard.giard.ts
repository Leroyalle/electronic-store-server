import { MiddlewareHandler } from 'hono';
import { getCookie } from 'hono/cookie';

import { TokenCommands } from '@/modules/auth/token.commands';
import { RefreshAuthVars } from '@/shared/types/auth-variables.type';

export function refreshGuard(
  tokenCommands: TokenCommands,
): MiddlewareHandler<{ Variables: RefreshAuthVars }> {
  return async (c, next) => {
    const refreshTokenCookie = getCookie(c, 'refreshToken');

    if (!refreshTokenCookie) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { payload } = await tokenCommands.verify(refreshTokenCookie, 'refresh');

    const refreshToken = await tokenCommands.findByJti(payload.jti);

    if (!refreshToken || refreshToken.revokedAt) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    c.set('jti', payload.jti);
    c.set('userId', payload.sub);
    // c.set('role', payload.role);

    return next();
  };
}
