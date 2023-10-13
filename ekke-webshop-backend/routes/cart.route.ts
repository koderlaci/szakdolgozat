import CartController from "../controllers/cart.controller.js";
import express from "express";

const cartController = new CartController();

const router = express.Router();

router.get("/get-all-carts", cartController.getAllCarts);

router.post("/add-cart", cartController.createCart);

router.post("/edit-cart/:id", cartController.editCart);

router.delete("/delete-cart/:id", cartController.deleteCart);

export default router;
