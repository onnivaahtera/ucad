import express from 'express';
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUserItem,
} from './controller.ts';
import {authenticateToken} from '../middlewares/authentication.ts';
import {body} from 'express-validator';
import {validationError} from '../middlewares/error-handler.ts';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getAllUsers)
  .post(
    body('email').trim().isEmail().withMessage('Must be a valid email address'),
    body('username')
      .trim()
      .isLength({min: 3, max: 20})
      .withMessage('Must be at least 3 chars long'),
    body('password').trim().isLength({min: 8}),
    validationError,
    addUser,
  );
userRouter
  .route('/:id')
  .get(getUserById)
  .put(
    body('email').trim().isEmail().withMessage('Must be a valid email address'),
    body('username')
      .trim()
      .isLength({min: 3, max: 20})
      .withMessage('Must be at least 3 chars long'),
    body('password').trim().isLength({min: 8}),
    authenticateToken,
    validationError,
    updateUserItem,
  )
  .delete(authenticateToken, deleteUser);

export default userRouter;
