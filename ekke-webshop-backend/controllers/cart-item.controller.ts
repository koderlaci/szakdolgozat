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
      },
    });

    await CartItem.create({
      userId: req.body.userId,
      cartId: req.body.cartId ? req.body.cartId : cart.getDataValue("cartId"),
      productId: req.body.productId,
      date: req.body.date,
    })
      .then(async () => {
        responseDto.created = true;
      })
      .catch(() => {
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

  getAllCartProductByUserId = asyncHandler(async (req, res) => {
    const activeCartId = await Cart.findOne({
      where: {
        userId: req.params.userId,
        active: 1,
      },
    });

    if (activeCartId) {
      await CartItem.findAll({
        where: {
          cartId: activeCartId,
        },
      }).then((result) => {
        let mappedProducts = [];

        result.forEach(async (cartItem) => {
          const product = await Product.findOne({
            where: {
              id: cartItem.getDataValue("product_id"),
            },
          });

          let mappedProduct = {
            ...product.dataValues,
            quantity: 1,
          };

          if (mappedProducts.includes(mappedProduct.id)) {
            mappedProducts[
              mappedProducts.findIndex(
                (product) => product.id === mappedProduct.id
              )
            ].quantity++;
          } else {
            mappedProducts.push(mappedProduct);
          }
        });

        res.send(mappedProducts);
      });
    }
  });
}
