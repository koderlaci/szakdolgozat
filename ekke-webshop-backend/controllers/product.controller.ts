import { Product } from "../models/product.model.js";
import asyncHandler from "express-async-handler";

export default class ProductController {
  getAllProducts = asyncHandler(async (req, res) => {
    const data = await Product.findAll();
    res.send(data);
  });

  createProduct = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    if (
      !req.body.variantId ||
      !req.body.name ||
      !req.body.type ||
      !req.body.style ||
      !req.body.color ||
      !req.body.size ||
      !req.body.price ||
      !req.body.quantity
    ) {
      responseDto.error = true;
      responseDto.message = "Kérjük minden adatot adj meg.";
      res.send(responseDto);
    } else {
      await Product.create({
        variantId: req.body.variantId,
        name: req.body.name,
        type: req.body.type,
        style: req.body.style,
        color: req.body.color,
        size: req.body.size,
        price: req.body.price,
        quantity: req.body.quantity,
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
    }
  });

  editProduct = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    await Product.update(
      {
        variantId: req.body.variantId,
        name: req.body.name,
        type: req.body.type,
        style: req.body.style,
        color: req.body.color,
        size: req.body.size,
        price: req.body.price,
        quantity: req.body.quantity,
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

  deleteProduct = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    await Product.destroy({
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

  getMenProducts = asyncHandler(async (req, res) => {
    await Product.findAll({
      where: {
        type: "men",
      },
    })
      .then((result) => {
        let products = [];
        let productVariants = [];

        result.forEach((product) => {
          if (!productVariants.includes(product.getDataValue("variantId"))) {
            products.push({
              variantId: product.getDataValue("variantId"),
              name: product.getDataValue("name"),
              price: product.getDataValue("price"),
              colors: getColors(result, product.getDataValue("variantId")),
            });
            productVariants.push(product.getDataValue("variantId"));
          }
        });

        res.send(products);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  getWomenProducts = asyncHandler(async (req, res) => {
    await Product.findAll({
      where: {
        type: "women",
      },
    })
      .then((result) => {
        let products = [];
        let productVariants = [];

        result.forEach((product) => {
          if (!productVariants.includes(product.getDataValue("variantId"))) {
            products.push({
              variantId: product.getDataValue("variantId"),
              name: product.getDataValue("name"),
              price: product.getDataValue("price"),
              colors: getColors(result, product.getDataValue("variantId")),
            });
            productVariants.push(product.getDataValue("variantId"));
          }
        });

        res.send(products);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  getAccessaryProducts = asyncHandler(async (req, res) => {
    await Product.findAll({
      where: {
        type: "accessary",
      },
    })
      .then((result) => {
        let products = [];
        let productVariants = [];

        result.forEach((product) => {
          if (!productVariants.includes(product.getDataValue("variantId"))) {
            products.push({
              variantId: product.getDataValue("variantId"),
              name: product.getDataValue("name"),
              price: product.getDataValue("price"),
              colors: getColors(result, product.getDataValue("variantId")),
            });
            productVariants.push(product.getDataValue("variantId"));
          }
        });

        res.send(products);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  getProductSliderAll = asyncHandler(async (req, res) => {
    await Product.findAll()
      .then((result) => {
        let products = [];
        let productVariants = [];

        result.forEach((product) => {
          if (!productVariants.includes(product.getDataValue("variantId"))) {
            products.push({
              variantId: product.getDataValue("variantId"),
              name: product.getDataValue("name"),
              price: product.getDataValue("price"),
              colors: getColors(result, product.getDataValue("variantId")),
            });
            productVariants.push(product.getDataValue("variantId"));
          }
        });

        res.send(products);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  getSpecificProduct = asyncHandler(async (req, res) => {
    await Product.findAll({
      where: {
        variantId: req.query.variantId,
      },
    })
      .then((result) => {
        let mappedProduct = {};
        let productVariants = [];

        result.forEach((product) => {
          if (!productVariants.includes(product.getDataValue("variantId"))) {
            mappedProduct = {
              variantId: product.getDataValue("variantId"),
              name: product.getDataValue("name"),
              price: product.getDataValue("price"),
              colors: getColors(result, product.getDataValue("variantId")),
              sizes: getSizes(result, product.getDataValue("variantId")),
            };
            productVariants.push(product.getDataValue("variantId"));
          }
        });

        res.send(mappedProduct);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  getProductSizes = asyncHandler(async (req, res) => {
    await Product.findAll({
      where: {
        variantId: req.query.variantId,
        color: req.query.color,
      },
    })
      .then((result) => {
        let sizes = [];

        result.forEach((product) => {
          sizes.push(product.getDataValue("size"));
        });

        res.send(sizes);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  getProductColors = asyncHandler(async (req, res) => {
    await Product.findAll({
      where: {
        variantId: req.query.variantId,
        size: req.query.size,
      },
    })
      .then((result) => {
        let colors = [];

        result.forEach((product) => {
          colors.push(product.getDataValue("color"));
        });

        res.send(colors);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  getFinalProduct = asyncHandler(async (req, res) => {
    await Product.findOne({
      where: {
        variantId: req.query.variantId,
        size: req.query.size,
        color: req.query.color,
      },
    })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

function getColors(products, variantId) {
  let colors = [];
  products.forEach((product) => {
    if (product.variantId === variantId && !colors.includes(product.color)) {
      colors.push(product.color);
    }
  });

  return colors;
}

function getSizes(products, variantId) {
  let sizes = [];
  products.forEach((product) => {
    if (product.variantId === variantId && !sizes.includes(product.size)) {
      sizes.push(product.size);
    }
  });

  return sizes;
}