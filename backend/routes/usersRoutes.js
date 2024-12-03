import express from "express";
const router = express.Router();

import {
  getAllUsers,
  UserLogin,
  UserRegister,
  // getUserById,
  // updateUser,
  // deleteUser,
} from "../controller/usersController.js";

router.get("/", getAllUsers);
//
router.post("/register", UserRegister);

router.post("/login", UserLogin);
//
// router.get("/:id", getUserById);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

export default router;
