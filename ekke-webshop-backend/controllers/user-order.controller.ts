import { UserOrder } from "../models/user-order.model.js";
import { CartItem } from "../models/cart-item.model.js";
import { Product } from "../models/product.model.js";
import { OrderAddress } from "../models/order-address.model.js";
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

  getAllUserReadableOrdersByUserId = asyncHandler(async (req, res) => {
    const orders = await UserOrder.findAll({
      where: {
        userId: req.query.userId,
      },
    });

    if (!orders) {
      res.send(null);
      return;
    }

    const mappedOrders = [];

    for (const order of orders) {
      const carItems = await CartItem.findAll({
        where: {
          cartId: order.getDataValue("cartId"),
        },
      });

      const products = [];

      for (const item of carItems) {
        const product = await Product.findOne({
          where: {
            id: item.getDataValue("productId"),
          },
        });

        products.push(product);
      }

      const orderAddress = await OrderAddress.findOne({
        where: {
          id: order.getDataValue("addressId"),
        },
      });

      mappedOrders.push({
        id: order.getDataValue("id"),
        status: order.getDataValue("status"),
        address: orderAddress,
        products: products,
        deliveryMode: order.getDataValue("deliveryMode"),
        totalPrice: order.getDataValue("price"),
        date: order.getDataValue("date"),
      });
    }

    res.send(mappedOrders);
  });

  checkIfTransactionHashHasBeenUsed = asyncHandler(async (req, res) => {
    const order = await UserOrder.findOne({
      where: {
        txhash: req.query.txhash,
      },
    });

    if (order) {
      res.send(true);
    } else {
      res.send(false);
    }
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
      txhash: req.body.txhash,
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
