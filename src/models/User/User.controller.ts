import asyncHandler from "src/helpers/asyncHandler";
import { UserService } from "./User.service";

const userService = new UserService();

export class UserController {
  constructor() {}

  /**
   * Create a new user
   * @param req - Express request object
   * @param res - Express response object
   */
  createUser = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  });
  

  //   getAllUser = asyncHandler(async (req, res) => {
  //   const user = await userService.getUserById();
  //   if (!user) {
  //     return res.status(404).json({
  //       message: "User not found",
  //     });
  //   }
  //   return res.status(200).json({
  //     message: "User retrieved successfully",
  //     data: user,
  //   });
  // });

  /**
   * Get a user by ID
   * @param req - Express request object
   * @param res - Express response object
   */
  getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUserById(Number(id));
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  });

  /**
   * Update a user by ID
   * @param req - Express request object
   * @param res - Express response object
   */
  updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedUser = await userService.updateUser(Number(id), req.body);
    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  });

  /**
   * Delete a user by ID
   * @param req - Express request object
   * @param res - Express response object
   */
  deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await userService.deleteUser(Number(id));
    return res.status(200).json({
      message: "User deleted successfully",
    });
  });
}
