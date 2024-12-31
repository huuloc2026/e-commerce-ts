// Auth.service.ts

import { IAuthService } from "./IAuthService";

export class AuthService implements IAuthService {
  private users: Map<string, string> = new Map(); // username: password
  private secretKey = "secret"; // Use a proper secret key in production

  async login(username: string, password: string): Promise<string> {
    const storedPassword = this.users.get(username);
    if (storedPassword && storedPassword === password) {
      const token = Buffer.from(`${username}:${password}`).toString("base64"); // Simple token generation
      return token;
    }
    throw new Error("Invalid credentials");
  }

  async register(data: any): Promise<void> {
    const { username, password } = data;
    if (this.users.has(username)) {
      throw new Error("User already exists");
    }
    this.users.set(username, password);
    console.log("User registered:", username);
  }

  async validateToken(token: string): Promise<boolean> {
    const decoded = Buffer.from(token, "base64").toString("ascii").split(":");
    const [username, password] = decoded;
    return this.users.get(username) === password;
  }
}
