import { createTransport } from 'nodemailer';

import { getEnv } from '@/shared/lib/helpers/get-env.helper';

export function createMailerClient() {
  const client = createTransport({
    secure: getEnv('MAIL_SECURE') === 'true',
    host: getEnv('MAIL_HOST'),
    port: parseInt(getEnv('MAIL_PORT')),
    auth: {
      user: getEnv('MAIL_USER'),
      pass: getEnv('MAIL_PASS'),
    },
  });

  return client;
}
