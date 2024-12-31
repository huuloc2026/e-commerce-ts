// AuthController.ts
import { Service } from "typedi";
import { IAuthService } from "./IAuthService";

@Service()
export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  async register(req, res, next) {
    try {
      await this.authService.register(req.body);
      return res.status(201).send("User registered");
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const token = await this.authService.login(
        req.body.username,
        req.body.password
      );
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async validate(req, res, next) {
    try {
      const isValid = await this.authService.validateToken(
        req.headers.authorization
      );
      return res.status(200).json({ valid: isValid });
    } catch (error) {
      next(error);
    }
  }
}
