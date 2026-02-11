export interface GitHubUserAuthDTO {
  externalId: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  provider: 'github';
}
