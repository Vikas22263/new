import JWT from "jsonwebtoken";
import usermodel from "../models/usermodel.js";
//protected Routes token base

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.SCK);
    next();
    if (!decode) {
      return res.send("invalid token");
    }
    req.user = decode;
  } catch (error) {
    console.log(error);
  }
};

export const IsAdmin = async (req, res, next) => {
  try {
    const user = await usermodel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorizes Access",
      });
    } else {
      next();
    }
  } catch (error) {}
};
