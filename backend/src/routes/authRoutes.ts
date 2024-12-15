import express, { NextFunction, Request, Response } from "express";
import { login, register } from "../controllers/authController";

const router = express.Router();

const handleController = (controller: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
};

router.post("/auth/register", handleController(register));
router.post("/auth/login", handleController(login));

export default router;
