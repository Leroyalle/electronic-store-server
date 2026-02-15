import { GitHubUserAuthDTO } from '@/shared/types/auth/oauth/github-user-info.type';
import { YandexUserinfo } from '@/shared/types/auth/oauth/yandex-user-info.type';

export function isGithubResponse(
  res: GitHubUserAuthDTO | YandexUserinfo,
): res is GitHubUserAuthDTO {
  return res && 'provider' in res && res.provider === 'github';
}
