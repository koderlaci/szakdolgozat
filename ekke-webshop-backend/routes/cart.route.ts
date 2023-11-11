import CartController from "../controllers/cart.controller.js";
import express from "express";

const cartController = new CartController();

const router = express.Router();

router.get("/get-all-carts", cartController.getAllCarts);

router.get("/get-active-cart-by-user-id", cartController.getActiveCartByUserId);

router.post("/add-cart", cartController.createCart);

router.put("/edit-cart", cartController.editCart);

router.post(
  "/disable-current-create-new-cart",
  cartController.DisableCurrentCreateNewCart
);

export default router;
