import { NextFunction, Request, Response } from "express";

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = "http://localhost:3000";
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(204).end();
  } else {
    next();
  }
};

export default corsMiddleware;
