import express from 'express';
import {
  deleteMediaItem,
  getAllmedia,
  getMediaById,
  updateMediaItem,
  uploadMedia,
} from './controller.ts';
import {authenticateToken} from '../middlewares/authentication.ts';
import upload from '../middlewares/upload.ts';
import {validationError} from '../middlewares/error-handler.ts';
import {body} from 'express-validator';

const mediaRouter = express.Router();

mediaRouter
  .route('/')
  .get(getAllmedia)
  .post(authenticateToken, upload.single('file'), uploadMedia);

mediaRouter
  .route('/:id')
  .get(getMediaById)
  .put(
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
    validationError,
    authenticateToken,
    updateMediaItem,
  )
  .delete(authenticateToken, deleteMediaItem);

export default mediaRouter;
