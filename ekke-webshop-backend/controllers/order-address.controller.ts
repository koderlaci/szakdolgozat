import { OrderAddress } from "../models/order-address.model.js";
import asyncHandler from "express-async-handler";

export default class OrderAddressController {
  getAllOrderAddresses = asyncHandler(async (req, res) => {
    const data = await OrderAddress.findAll();
    res.send(data);
  });

  createOrderAddress = asyncHandler(async (req, res) => {
    await OrderAddress.create({
      country: req.body.country,
      zipCode: req.body.zipCode,
      city: req.body.city,
      streetName: req.body.streetName,
      streetType: req.body.streetType,
      houseNumber: req.body.houseNumber,
      apartment: req.body.apartment,
      floor: req.body.floor,
      door: req.body.door,
    })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        res.send(res);
      });
  });
}
