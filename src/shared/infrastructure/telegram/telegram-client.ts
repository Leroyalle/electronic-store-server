import { Bot } from 'grammy';

import { getEnv } from '@/shared/lib/helpers/get-env.helper';

export function createTelegramBot(): Bot {
  const bot = new Bot(getEnv('BOT_API_KEY'));
  return bot;
}
