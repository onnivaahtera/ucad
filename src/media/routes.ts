import express from 'express';
import multer from 'multer';
import {
  deleteMediaItem,
  getAllmedia,
  getMediaById,
  updateMediaItem,
  uploadMedia,
} from './controller.ts';

const upload = multer({dest: 'uploads/'});

const mediaRouter = express.Router();

mediaRouter
  .route('/')
  .get(getAllmedia)
  .post(upload.single('file'), uploadMedia);

mediaRouter
  .route('/:id')
  .get(getMediaById)
  .put(updateMediaItem)
  .delete(deleteMediaItem);

export default mediaRouter;
