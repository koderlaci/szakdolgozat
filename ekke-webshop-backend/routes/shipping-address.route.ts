import ShippingAddressController from "../controllers/shipping-address.controller.js";
import express from "express";

const shippingAddressController = new ShippingAddressController();

const router = express.Router();

router.get(
  "/get-all-shipping-addresses",
  shippingAddressController.getAllShippingAddresses
);

router.post(
  "/add-shipping-address",
  shippingAddressController.createShippingAddress
);

router.post(
  "/edit-shipping-address/:id",
  shippingAddressController.editShippingAddress
);

router.delete(
  "/delete-shipping-address/:id",
  shippingAddressController.deleteShippingAddress
);

export default router;
