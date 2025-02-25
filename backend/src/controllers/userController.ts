import { Request, Response } from "express";
import {
  addUser,
  editUser,
  fetchAllUsers,
  fetchUserById,
  removeUser,
} from "../services/userService";
import { AuthenticatedRequest } from "../types/express";
import { handleErrorResponse } from "../utils/errorHandler";

export const getAllUsers = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      res.status(403).json({
        message: "Access forbidden: Admin access required",
      });
      return;
    }
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
export const getUserById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (req.user.role !== "ADMIN" && req.user.userId !== req.params.id) {
      res.status(403).json({
        message: "Access forbidden: You can only access your own data",
      });
      return;
    }
    const user = await fetchUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const user = await addUser({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email } = req.body;

  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (req.user.role !== "ADMIN" && req.user.userId !== req.params.id) {
      res.status(403).json({
        message: "Access forbidden: You can only modify your own data",
      });
      return;
    }

    const user = await editUser(req.params.id, {
      ...req.body,
    });
    res.status(200).json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (req.user.role !== "ADMIN" && req.user.userId !== req.params.id) {
      res.status(403).json({
        message: "Access forbidden: You can only delete your own account",
      });
      return;
    }

    await removeUser(req.params.id);
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
