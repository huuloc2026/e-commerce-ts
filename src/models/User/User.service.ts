import { PrismaClient } from "@prisma/client";
import { UserDTO } from "./DTO/UserDTO";
import { IUserService } from "./IUserService";

export class UserService implements IUserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async createUser(data: UserDTO): Promise<any> {
    try {
      const user = await this.prisma.user.create({
        data,
      });
      return user; // Returning the newly created user
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }
  async getUserById(id: string): Promise<any> {
    `id`;
  }
  async updateUser(id: string, data: any): Promise<void> {
    `data`;
  }
  async deleteUser(id: string): Promise<void> {
    `id`;
  }

  findByEmail = async (email: string) => {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  };

  findByID = async (id: number) => {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  };
}
