import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthinticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Account is not logged in, Login First",
    });

  const decodded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodded._id);
  next();
};
