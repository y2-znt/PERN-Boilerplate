import express from "express";
import { login, logout, register } from "../controllers/authController";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);

export default router;
