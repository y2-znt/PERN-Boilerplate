import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import prisma from "../prisma/prismaClient";
import { AuthenticatedRequest } from "../types/express";

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = { userId: user.id };
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

export default authMiddleware;
