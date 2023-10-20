import CartItemController from "../controllers/cart-item.controller.js";
import express from "express";

const cartItemController = new CartItemController();

const router = express.Router();

router.get("/get-all-cart-items", cartItemController.getAllCartItems);

router.post("/add-cart-item", cartItemController.createCartItem);

router.post("/edit-cart-item/:id", cartItemController.editCartItem);

router.delete("/delete-cart-item/:id", cartItemController.deleteCartItem);

router.delete(
  "/delete-cart-item-by-product-id-and-user-id/:productId/:userId",
  cartItemController.deleteCartItemByProductIdAndUserId
);

router.get(
  "/get-all-cart-product-by-user-id",
  cartItemController.getAllCartProductByUserId
);

export default router;
