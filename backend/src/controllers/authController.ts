import { Request, Response } from "express";
import { loggedInUser, loginUser, registerUser } from "../services/authService";
import { AuthenticatedRequest } from "../types/express";
import { handleErrorResponse } from "../utils/errorHandler";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = await registerUser(req.body);

    console.log("register token", token);

    res.status(201).json({ message: "User created successfully", user, token });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = await loginUser(req.body);

    console.log("login token", token);

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }

    const user = await loggedInUser(req.user.userId);
    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const logout = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
