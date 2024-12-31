// IAuthService.ts
export interface IAuthService {
  login(username: string, password: string): Promise<string>;
  register(data: any): Promise<void>;
  validateToken(token: string): Promise<boolean>;
}
