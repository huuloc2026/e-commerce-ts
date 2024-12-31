// IUserService.ts
export interface IUserService {
  createUser(data: any): Promise<void>;
  getUserById(id: string): Promise<any>;
  updateUser(id: string, data: any): Promise<void>;
  deleteUser(id: string): Promise<void>;
}
