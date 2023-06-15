import express from "express";
const userRouter = express.Router();

import {
  getAllUsers,
  createUser,
  getUser,
  confirmUser,
} from "./UserController";
import { setUserCookie } from "../middleware/userCookie";

userRouter.route("/").get(getAllUsers).post(createUser, setUserCookie);

userRouter.route("/getUser").get(getUser);

userRouter.route("/confirmUser").post(confirmUser, setUserCookie);

export default userRouter;
