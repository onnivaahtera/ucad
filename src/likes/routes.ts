import express from 'express';
import {
  getMediaLikes,
  addMediaLikes,
  getUserLikes,
  removeMediaLikes,
} from './controller.ts';

const likeRouter = express.Router();

likeRouter.route('/media/:id').get(getMediaLikes);
likeRouter
  .route('/media/:media_id/:user_id')
  .post(addMediaLikes)
  .delete(removeMediaLikes);

likeRouter.route('/user/:id').get(getUserLikes);

export default likeRouter;
