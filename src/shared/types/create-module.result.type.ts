export type CreateModuleResult<C = never, Q = null, S = null> = (C extends null
  ? {}
  : { commands: C }) &
  (Q extends null ? {} : { queries: Q }) &
  (S extends null ? {} : { services: S });
