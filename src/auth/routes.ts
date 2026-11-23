import express from 'express';
import {getMe, postLogin} from './cotroller.ts';
import {authenticateToken} from '../middlewares/authentication.ts';
import {validationError} from '../middlewares/error-handler.ts';
import {body} from 'express-validator';

const authRouter = express.Router();

authRouter
  .route('/login')
  .post(
    body('username').trim().notEmpty(),
    body('password').trim(),
    validationError,
    postLogin,
  );
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
