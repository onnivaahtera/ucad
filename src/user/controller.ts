import type {Request, Response, NextFunction} from 'express';
import {
  createUser,
  listAllUsers,
  listUserById,
  removeUser,
  updateUser,
} from './model.ts';
import {validationResult} from 'express-validator';

export const getAllUsers = async (_req: Request, res: Response) => {
  const result = await listAllUsers();
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};

export const getUserById = async (req: Request, res: Response) => {
  const result = await listUserById(Number(req.params.id));
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};

export const updateUserItem = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401);
  }
  const result = await updateUser(req.user, {
    keys: Object.keys(req.body),
    values: Object.values(req.body),
  });
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};

export const addUser = async (req: Request, res: Response) => {
  const user_id = 2;
  const result = await createUser(Object.values(req.body), user_id);

  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.message);
};

export const deleteUser = async (req: Request, res: Response) => {
  const result = await removeUser(Number(req.params.id));
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.message);
};
