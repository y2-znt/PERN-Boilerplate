import bcrypt from "bcrypt";
import { z } from "zod";
import { SALT_ROUNDS } from "../config/config";
import prisma from "../prisma/prismaClient";
import { loginSchema, registerSchema } from "../schemas/authSchema";
import { generateToken } from "../utils/generateToken";

export const registerUser = async (data: z.infer<typeof registerSchema>) => {
  const { name, email, password, confirmPassword } = registerSchema.parse(data);

  if (password !== confirmPassword) throw new Error("Passwords do not match");

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const token = generateToken(user.id);

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};

export const loginUser = async (data: z.infer<typeof loginSchema>) => {
  const { email, password } = loginSchema.parse(data);

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Invalid password");

  const token = generateToken(user.id);

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};

export const loggedInUser = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    throw new Error("An error occurred while retrieving user information");
  }
};
