import express from 'express';
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUserItem,
} from './controller.ts';
import {authenticateToken} from '../middlewares/authentication.ts';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(addUser);
userRouter
  .route('/:id')
  .get(getUserById)
  .put(authenticateToken, updateUserItem)
  .delete(authenticateToken, deleteUser);

export default userRouter;
