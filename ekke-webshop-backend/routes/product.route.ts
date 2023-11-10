import ProductController from "../controllers/product.controller.js";
import express from "express";

const productController = new ProductController();

const router = express.Router();

router.get("/get-all-products", productController.getAllProducts);

router.post("/add-product", productController.createProduct);

router.post("/edit-product/:id", productController.editProduct);

router.delete("/delete-product/:id", productController.deleteProduct);

router.get("/get-men-products", productController.getMenProducts);

router.get("/get-women-products", productController.getWomenProducts);

router.get("/get-accessary-products", productController.getAccessaryProducts);

router.get("/get-product-slider-all", productController.getProductSliderAll);

router.get("/get-specific-product", productController.getSpecificProduct);

router.get("/get-product-sizes", productController.getProductSizes);

router.get("/get-product-colors", productController.getProductColors);

router.get("/get-final-product", productController.getFinalProduct);

router.get(
  "/check-product-availability-by-quantity",
  productController.checkProductAvailabilityByQuantity
);

router.post(
  "/subtract-product-quantity-by-id",
  productController.subtractProductQuantityById
);

export default router;
