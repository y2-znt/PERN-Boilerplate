import express, { NextFunction, Request, Response } from "express";
import { login, register } from "../controllers/authController";

const router = express.Router();

router.post(
  "/auth/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await register(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/auth/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await login(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
