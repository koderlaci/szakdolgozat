import { UserOrder } from "../models/user-order.model.js";
import asyncHandler from "express-async-handler";

export default class UserOrderController {
  getAllOrders = asyncHandler(async (req, res) => {
    UserOrder.findAll()
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  createOrder = asyncHandler(async (req, res) => {
    let responseDto = {
      created: false,
      message: null,
    };

    await UserOrder.create({
      status: "paid",
      userId: req.body.userId,
      addressId: req.body.addressId,
      cartId: req.body.cartId,
      price: req.body.price,
      deliveryMode: req.body.deliveryMode,
      date: req.body.date,
    })
      .then(() => {
        responseDto.created = true;
      })
      .catch((error) => {
        console.log(error);
        responseDto.message = "Hiba történt, kérjük próbáld újra.";
      })
      .finally(() => {
        res.send(responseDto);
      });
  });

  editOrder = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    await UserOrder.update(
      {
        status: req.body.status,
        userId: req.body.userId,
        addressId: req.body.addressId,
        cartId: req.body.cartId,
        price: req.body.price,
        deliveryMode: req.body.deliveryMode,
        date: req.body.date,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .catch(() => {
        responseDto.error = true;
        responseDto.message = "Hiba történt, kérjük próbáld újra.";
      })
      .finally(() => {
        res.send(responseDto);
      });
  });

  deleteOrder = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    await UserOrder.destroy({
      where: {
        id: req.params.id,
      },
    })
      .catch(() => {
        responseDto.error = true;
        responseDto.message = "Hiba történt, kérjük próbáld újra.";
      })
      .finally(() => {
        res.send(responseDto);
      });
  });
}
