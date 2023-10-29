import { Cart } from "../models/cart.model.js";
import asyncHandler from "express-async-handler";

export default class CartController {
  getAllCarts = asyncHandler(async (req, res) => {
    const data = await Cart.findAll();
    res.send(data);
  });

  getActiveCartByUserId = asyncHandler(async (req, res) => {
    Cart.findOne({
      where: {
        userId: req.query.userId,
        active: 1,
      },
    })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        res.send(res);
      });
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

  createCartForUser = async (id) => {
    await Cart.create({
      userId: id,
      active: 1,
    })
      .then((result) => {
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
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
