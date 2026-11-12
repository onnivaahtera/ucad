import type {Request, Response} from 'express';
import {
  createUser,
  listAllUsers,
  listUserById,
  removeUser,
  updateUser,
} from './model.ts';

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
  if (!req.body || Object.entries(req.body).length === 0) {
    return res.status(400).json({error: 'No request body'});
  }
  const result = await updateUser(Number(req.params.id), {
    keys: Object.keys(req.body),
    values: Object.values(req.body),
  });
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};

export const addUser = async (req: Request, res: Response) => {
  if (!req.body || Object.entries(req.body).length === 0) {
    return res.status(400).json({error: 'No request body'});
  }
  const result = await createUser(Object.values(req.body));
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
