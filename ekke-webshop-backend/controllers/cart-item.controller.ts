import { CartItem } from "../models/cart-item.model.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import asyncHandler from "express-async-handler";

export default class CartItemController {
  getAllCartItems = asyncHandler(async (req, res) => {
    CartItem.findAll()
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  createCartItem = asyncHandler(async (req, res) => {
    let responseDto = {
      created: false,
      message: null,
    };

    const cart = await Cart.findOne({
      where: {
        userId: req.body.userId,
        active: 1,
      },
    });

    await CartItem.create({
      userId: req.body.userId,
      cartId: req.body.cartId ? req.body.cartId : cart.getDataValue("id"),
      productId: req.body.productId,
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

  editCartItem = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    await CartItem.update(
      {
        userId: req.body.userId,
        cartId: req.body.cartId,
        productId: req.body.productId,
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

  deleteCartItem = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    await CartItem.destroy({
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

  deleteCartItemByProductIdAndUserId = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    const activeCart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        active: 1,
      },
    });

    const cartItem = await CartItem.findOne({
      order: [["id", "DESC"]],
      where: {
        cartId: activeCart.getDataValue("id"),
        productId: req.params.productId,
      },
    });

    cartItem
      .destroy()
      .catch(() => {
        responseDto.error = true;
        responseDto.message = "Hiba történt, kérjük próbáld újra.";
      })
      .finally(() => {
        res.send(responseDto);
      });
  });

  getAllCartProductByUserId = asyncHandler(async (req, res) => {
    const activeCart = await Cart.findOne({
      where: {
        userId: req.query.userId,
        active: 1,
      },
    });

    if (activeCart) {
      await CartItem.findAll({
        where: {
          cartId: activeCart.getDataValue("id"),
        },
      })
        .then(async (result) => {
          let mappedProducts = [];

          for (const cartItem of result) {
            const product = await Product.findOne({
              where: {
                id: cartItem.getDataValue("productId"),
              },
            });

            let mappedProduct = {
              ...product.dataValues,
              selectedQuantity: 1,
            };

            const productAlreadyInMappedProducts = mappedProducts.find(
              (product) => product.id === mappedProduct.id
            );

            if (productAlreadyInMappedProducts) {
              mappedProducts[
                mappedProducts.findIndex(
                  (product) => product.id === mappedProduct.id
                )
              ].selectedQuantity++;
            } else {
              mappedProducts.push(mappedProduct);
            }
          }

          res.send(mappedProducts);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
}
