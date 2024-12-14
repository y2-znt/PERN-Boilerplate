import express from "express";
import { login, register } from "../controllers/authController";

const router = express.Router();

router.get("/auth/login", login);
router.post("/auth/register", register);

export default router;
