import express from 'express';
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUserItem,
} from './controller.ts';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(addUser);
userRouter
  .route('/:id')
  .get(getUserById)
  .put(updateUserItem)
  .delete(deleteUser);

export default userRouter;
