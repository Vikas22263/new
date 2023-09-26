import express from "express";
import {
  getProductController,
  getsingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
} from "../controllers/productControler.js";
import formidable from "express-formidable";

const router = express.Router();

//Routes

// ALl get products
router.get("/get-products", getProductController);



//getphotos
router.get("/product-photo/:pid", productPhotoController);

//filter product
router.post("/product-filters", productFiltersController);
//product count
router.get("/product-count", productCountController);
//product per page
router.get("/product-list/:page", productListController);


export default router;
