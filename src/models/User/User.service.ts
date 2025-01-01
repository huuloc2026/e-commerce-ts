import { PrismaClient } from "@prisma/client";
import { UserDTO } from "./DTO/UserDTO";

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(data: UserDTO): Promise<any> {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }
  async getUserByEmail(email: string): Promise<any> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getUserById(id: number): Promise<any> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: number, data: any): Promise<any> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
