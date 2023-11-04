import UserController from "../controllers/user.controller.js";
import express from "express";

const userController = new UserController();

const router = express.Router();

router.get("/get-all-users", userController.getAllUsers);

router.get("/get-user-by-id", userController.getUserById);

router.post("/add-user", userController.createUser);

router.post("/edit-user/:id", userController.editUser);

router.delete("/delete-user/:id", userController.deleteUser);

router.post("/login", userController.login);

export default router;
