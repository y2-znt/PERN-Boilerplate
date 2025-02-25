import express from "express";
import {
  getCurrentUser,
  googleAuth,
  googleAuthCallback,
  login,
  logout,
  register,
} from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/current-user", authMiddleware, getCurrentUser);
router.post("/logout", authMiddleware, logout);

// Google OAuth routes
router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback);

export default router;
