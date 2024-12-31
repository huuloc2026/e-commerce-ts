
import { UserService } from "./User.service";

const userService = new UserService()
export class UserController {
  constructor() {}

  async TestController(req,res,next) {
    console.log(req.body);
    //const result = await userService.createUser(req.body)
    return res.send("sucess");
  }
}