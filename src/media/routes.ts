import express from 'express';
import multer from 'multer';
import {
  deleteMediaItem,
  getAllmedia,
  getMediaById,
  updateMediaItem,
  uploadMedia,
} from './controller.ts';
import {authenticateToken} from '../middlewares/authentication.ts';

const upload = multer({dest: 'uploads/'});

const mediaRouter = express.Router();

mediaRouter
  .route('/')
  .get(getAllmedia)
  .post(authenticateToken, upload.single('file'), uploadMedia);

mediaRouter
  .route('/:id')
  .get(getMediaById)
  .put(authenticateToken, updateMediaItem)
  .delete(authenticateToken, deleteMediaItem);

export default mediaRouter;
