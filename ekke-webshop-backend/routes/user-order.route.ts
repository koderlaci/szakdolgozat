import UserOrderController from "../controllers/user-order.controller.js";
import express from "express";

const userOrderController = new UserOrderController();

const router = express.Router();

router.get("/get-all-orders", userOrderController.getAllOrders);

router.get(
  "/get-all-user-readable-orders-by-user-id",
  userOrderController.getAllUserReadableOrdersByUserId
);

router.get(
  "/check-if-transaction-hash-has-been-used",
  userOrderController.checkIfTransactionHashHasBeenUsed
);

router.post("/add-order", userOrderController.createOrder);

router.post("/edit-order/:id", userOrderController.editOrder);

router.delete("/delete-order/:id", userOrderController.deleteOrder);

export default router;
