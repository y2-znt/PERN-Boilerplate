import { Request, Response } from "express";
import { z } from "zod";
import { loggedInUser, loginUser, registerUser } from "../services/authService";
import { clearAuthCookie, setAuthCookie } from "../utils/authCookie";
import { AuthenticatedRequest } from "../utils/express";

const handleErrorResponse = (res: Response, error: unknown) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ message: "Validation error", errors: error.errors });
  } else {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = await registerUser(req.body);

    setAuthCookie(res, token);
    console.log("register token", token);

    res.status(201).json({ message: "User created successfully", user, token });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = await loginUser(req.body);

    setAuthCookie(res, token);
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
    console.error("Error retrieving current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    clearAuthCookie(res);
    console.log("logout token cleared", req.cookies.authToken);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during logout" });
  }
};
