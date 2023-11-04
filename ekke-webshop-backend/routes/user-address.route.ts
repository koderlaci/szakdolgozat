import AddressController from "../controllers/user-address.controller.js";
import express from "express";

const addressController = new AddressController();

const router = express.Router();

router.get("/get-all-user-addresses", addressController.getAllUserAddresses);

router.get(
  "/get-user-address-by-user-id",
  addressController.getUserAddressByUserId
);

router.post("/add-user-address", addressController.createUserAddress);

router.post("/edit-user-address", addressController.editUserAddress);

router.delete("/delete-user-address/:id", addressController.deleteUserAddress);

export default router;
