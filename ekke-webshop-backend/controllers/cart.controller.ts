import { Cart } from "../models/cart.model.js";
import asyncHandler from "express-async-handler";

export default class ShippingAddressController {
  getAllCarts = asyncHandler(async (req, res) => {
    const data = await Cart.findAll();
    res.send(data);
  });

  createCart = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    await Cart.create({
      userId: req.body.userId,
      active: req.body.active,
    })
      .then(async (result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        responseDto.error = true;
        responseDto.message = "Hiba történt, kérjük próbáld újra.";
      })
      .finally(() => {
        res.send(responseDto);
      });
  });

  editCart = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    await Cart.update(
      {
        userId: req.body.userId,
        active: req.body.active,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        responseDto.error = true;
        responseDto.message = "Hiba történt, kérjük próbáld újra.";
      })
      .finally(() => {
        res.send(responseDto);
      });
  });

  deleteCart = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    await Cart.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        responseDto.error = true;
        responseDto.message = "Hiba történt, kérjük próbáld újra.";
      })
      .finally(() => {
        res.send(responseDto);
      });
  });

  createCartForUser = async (userId) => {
    await Cart.create({
      userId: userId,
      active: 1,
    })
      .then(async (result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  disableCart = async (id) => {
    await Cart.create({
      id: id,
      active: 0,
    })
      .then(async (result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
