import express from "express";
import {

  logincontroller,
  registerController,
 
} from "../controllers/authController.js";
import {  requireSignIn } from "../middlewares/authmiddleware.js";

const router = express.Router();
//Login || POST
router.post("/login", logincontroller);
//register route

router.post("/register", registerController);

//Protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Admin Route
router.get("/admin-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
