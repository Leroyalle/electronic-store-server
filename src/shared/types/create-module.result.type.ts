import { Env, Hono, Schema } from 'hono';
import { BlankEnv, BlankSchema } from 'hono/types';

export interface CreateModuleResult {
  commands: unknown;
  router: Hono<BlankEnv, BlankSchema, '/'>;
}
