import { Request, Response } from "express";
import { z } from "zod";
import { loginUser, registerUser } from "../services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors });
    } else {
      res.status(400).json({ message: (error as Error).message });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = await loginUser(req.body);

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors });
    } else {
      res.status(400).json({ message: (error as Error).message });
    }
  }
};
