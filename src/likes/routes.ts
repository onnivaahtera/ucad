import express from 'express';
import {
  getMediaLikes,
  addMediaLikes,
  getUserLikes,
  removeMediaLikes,
} from './controller.ts';
import {authenticateToken} from '../middlewares/authentication.ts';

const likeRouter = express.Router();

likeRouter.route('/media/:id').get(getMediaLikes);
likeRouter
  .route('/media/:media_id/:user_id')
  .post(authenticateToken, addMediaLikes)
  .delete(authenticateToken, removeMediaLikes);

likeRouter.route('/user/:id').get(getUserLikes);

export default likeRouter;
