import { Response } from "express";

export const setAuthCookie = (res: Response, token: string) => {
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

export const clearAuthCookie = (res: Response) => {
  res.clearCookie("authToken");
};
