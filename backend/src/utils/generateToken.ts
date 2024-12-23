import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_EXPIRY } from "../config/config";

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });
};
