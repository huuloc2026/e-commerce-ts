// IUserService.ts
export interface IUserService {
  createUser(data: any): Promise<any>;
  getUserById(id: string): Promise<any>;
  updateUser(id: string, data: any): Promise<any>;
  deleteUser(id: string): Promise<any>;
}
