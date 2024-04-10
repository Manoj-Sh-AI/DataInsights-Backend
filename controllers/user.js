import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../Middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;

    let user = await User.findOne({ Email }).select("+Password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome Back, ${user.Identification}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { Identification, Email, Password, Branch } = req.body;

    let user = await User.findOne({ Email });

    if (user) return next(new ErrorHandler("User Already Exists", 400));

    const hashedPassword = await bcrypt.hash(Password, 10);

    user = await User.create({ Identification, Email, Password: hashedPassword, Branch });

    sendCookie(user, res, "Regestered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getmyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
