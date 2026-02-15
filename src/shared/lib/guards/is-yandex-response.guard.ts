import { GitHubUserAuthDTO } from '@/shared/types/auth/oauth/github-user-info.type';
import { YandexUserinfo } from '@/shared/types/auth/oauth/yandex-user-info.type';

export function isYandexResponse(res: GitHubUserAuthDTO | YandexUserinfo): res is YandexUserinfo {
  return res && 'client_id' in res;
}
