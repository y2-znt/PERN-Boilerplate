import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", authMiddleware, getCurrentUser);
router.post("/logout", logout);

export default router;
