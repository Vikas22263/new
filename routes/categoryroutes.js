import express from "express";
import { categoryController } from "../controllers/categoryController.js";
const router = express.Router();

//routes

//get all category
router.get("/get-category", categoryController);

export default router;
