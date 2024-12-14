import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
