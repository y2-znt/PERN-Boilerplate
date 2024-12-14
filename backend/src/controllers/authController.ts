import bcrypt from "bcrypt";
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const login = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
