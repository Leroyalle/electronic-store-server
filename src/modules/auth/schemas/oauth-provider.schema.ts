import z from 'zod';

import { ProviderName, providersMap } from '../constants/providers-map.constant';

export const oauthProvider = z.object({
  provider: z.enum(Object.keys(providersMap) as ProviderName[]),
});
