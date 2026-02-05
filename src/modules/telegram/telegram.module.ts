import { createTelegramBot } from '@/shared/infrastructure/telegram/telegram-client';
import { CreateModuleResult } from '@/shared/types/create-module.result.type';

import { TelegramCommands } from './telegram.commands';

export function createTelegramModule(): CreateModuleResult<TelegramCommands> {
  console.log(process.env.BOT_API_KEY);
  const bot = createTelegramBot();
  const commands = new TelegramCommands(bot);

  return { commands };
}
