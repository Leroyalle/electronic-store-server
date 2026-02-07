export type AuthVars = {
  userId: string;
  role?: 'user' | 'admin';
};

export type RefreshAuthVars = AuthVars & { jti: string };
