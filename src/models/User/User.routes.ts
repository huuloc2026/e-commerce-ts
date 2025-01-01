
import express from "express";
import { UserController } from "./User.controller";

const router = express.Router();
const userController = new UserController();

router.post("/", userController.createUser);
router.get("/:", userController.getUserById);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);





export default router