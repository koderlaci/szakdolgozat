import OrderAddressController from "../controllers/order-address.controller.js";
import express from "express";

const orderAddressController = new OrderAddressController();

const router = express.Router();

router.get(
  "/get-all-order-addresses",
  orderAddressController.getAllOrderAddresses
);

router.post("/add-order-address", orderAddressController.createOrderAddress);

export default router;
