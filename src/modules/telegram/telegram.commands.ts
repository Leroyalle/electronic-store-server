import { Bot } from 'grammy';

import { Order } from '@/shared/infrastructure/db/schema/order.schema';
import { User } from '@/shared/infrastructure/db/schema/user.schema';
import { getEnv } from '@/shared/lib/helpers/get-env.helper';

export class TelegramCommands {
  private adminChatId: string;
  constructor(private readonly bot: Bot) {
    this.adminChatId = getEnv('TELEGRAM_ADMIN_CHAT_ID');
  }

  public async notifyAdminNewOrder(customer: User, order: Order) {
    const items = order.items
      .map(
        (item, i) => `${i + 1}. ${item.product.name} × ${item.quantity} — ${item.product.price} ₽`,
      )
      .join('\n');

    const message = `
🆕 *Новый заказ*

*Order ID:* \`${order.id}\`
*Пользователь:* ${customer.id}
*Телефон:* ${customer.phone}

*Состав заказа:*
${items}

*Итого:* ${order.totalAmount} ₽
*Создан:* ${order.createdAt.toISOString()}
`;

    await this.bot.api.sendMessage(this.adminChatId, message, {
      parse_mode: 'Markdown',
    });
  }
}
