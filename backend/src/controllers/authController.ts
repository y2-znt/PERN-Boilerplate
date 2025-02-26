import { Request, Response } from "express";
import passport from "passport";
import { CLIENT_URL } from "../config/env";
import { loggedInUser, loginUser, registerUser } from "../services/authService";
import { AuthenticatedRequest } from "../types/express";
import { clearAuthCookie, setAuthCookie } from "../utils/authCookies";
import { handleErrorResponse } from "../utils/errorHandler";
import { generateToken } from "../utils/generateToken";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = await registerUser(req.body);

    setAuthCookie(res, token);

    res.status(201).json({ message: "User created successfully", user, token });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = await loginUser(req.body);

    setAuthCookie(res, token);

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
      return handleErrorResponse(res, new Error("Unauthorized: No user found"));
    }

    const user = await loggedInUser(req.user.userId);
    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
    console.error("Error retrieving current user:", error);
    handleErrorResponse(res, error);
  }
};

export const logout = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    clearAuthCookie(res);

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = (req: Request, res: Response) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err) {
      console.error("❌ Google authentication error:", err);
      return res.redirect(
        `${CLIENT_URL}/auth/error?message=${encodeURIComponent(err.message)}`
      );
    }
    if (!user) {
      return res.redirect(
        `${CLIENT_URL}/auth/error?message=${encodeURIComponent(
          "Authentication failed"
        )}`
      );
    }

    try {
      const token = generateToken(user.id);

      setAuthCookie(res, token);

      res.redirect(`${CLIENT_URL}/auth/callback?token=${token}`);
    } catch (error) {
      console.error("❌ Token generation error:", error);
      res.redirect(
        `${CLIENT_URL}/auth/error?message=${encodeURIComponent(
          "Failed to generate authentication token"
        )}`
      );
    }
  })(req, res);
};
