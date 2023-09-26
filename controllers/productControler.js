import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";

import fs from "fs";

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      total: products.length,
      succes: true,
      message: "AllProducts",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "error in geting productcontroller",
      error,
    });
  }
};
//get single products
export const getsingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      succes: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "error in geting singleproductcontroller",
      error,
    });
  }
};

//get-photo

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "error in geting produphoto",
      error,
    });
  }
};

//filter
export const productFiltersController = async (req, res) => {
  try {
    const { checked, selectedRadioValue } = req.body;
    const args = {};

    if (checked.length > 0) {
      args.category = { $in: checked }; // Use $in for matching multiple categories
    }

    if (selectedRadioValue.length === 2) {
      args.price = { $gte: selectedRadioValue[0], $lte: selectedRadioValue[1] };
    }

    const products = await productModel.find(args);

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error in filtering products",
    });
  }
};

//product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      succes: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

//product list base on page
export const productListController = async (req, res) => {
  try {
    const perpage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ",
      error,
    });
  }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};
