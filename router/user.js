import Express from "express";
import { User } from "../models/user.js";
import {
  getmyProfile,
  register,
  logout,
  login,
} from "../controllers/user.js";
import { isAuthinticated } from "../Middlewares/auth.js";

const router = Express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/my_account", isAuthinticated, getmyProfile);


export default router;
