import { model } from "mongoose";
import { comparepassword, hasPassword } from "../helpers/authHelper.js";
import userModel from "../models/usermodel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { firstname, email, password, lastname } = req.body;

    // Validation
    if (!firstname) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!lastname) {
      return res.send({ message: "Phone is required" });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered. Please log in.",
      });
    }
    //hash password
    const hashedpassword = await hasPassword(password);

    //save
    const user = await new userModel({
      firstname,
      lastname,
      email,
      password: hashedpassword,
    }).save();
    res.status(200).send({
      success: true,
      message: "User Register Successfuly",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email is not register",
      });
    }
    const match = await comparepassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.SCK, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user. firstname,
        lastname:user.lastname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
