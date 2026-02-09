import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { getEnv } from '@/shared/lib/helpers/get-env.helper';
import { ISendEmailPayload } from '@/shared/types/send-email-payload.type';

export interface IMailerService {
  send: (payload: ISendEmailPayload) => void;
}

export class MailerService implements IMailerService {
  constructor(
    private readonly client: Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>,
  ) {}

  public async send(payload: ISendEmailPayload) {
    try {
      return await this.client.sendMail({
        from: `"RESTORE" <${getEnv('MAIL_USER')}>`,
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
      });
    } catch (error) {
      console.log('MAILER SERVICE.SEND ERROR', error);
    }
  }
}
