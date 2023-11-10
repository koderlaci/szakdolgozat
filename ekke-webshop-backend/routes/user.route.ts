import UserController from "../controllers/user.controller.js";
import express from "express";

const userController = new UserController();

const router = express.Router();

router.get("/get-all-users", userController.getAllUsers);

router.get("/get-user-by-id", userController.getUserById);

router.post("/add-user", userController.createUser);

router.put("/edit-user", userController.editUser);

router.put("/edit-password", userController.editPassword);

router.delete("/delete-user/:id", userController.deleteUser);

router.post("/login", userController.login);

export default router;
