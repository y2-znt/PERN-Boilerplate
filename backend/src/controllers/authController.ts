import { Request, Response } from "express";
import { z } from "zod";
import { loginUser, registerUser } from "../services/authService";

const handleErrorResponse = (res: Response, error: unknown) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ message: "Validation error", errors: error.errors });
  } else {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = await loginUser(req.body);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Helps prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during logout" });
  }
};
