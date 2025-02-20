import { Request, Response } from "express";
import {
  addUser,
  editUser,
  fetchAllUsers,
  fetchUserById,
  removeUser,
} from "../services/userService";
import { handleErrorResponse } from "../utils/errorHandler";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
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
    const user = await editUser(req.params.id, {
      username,
      email,
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
    await removeUser(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
