import type {Request, Response} from 'express';
import {
  addMedia,
  deleteMedia,
  listAllMedia,
  listMediaById,
  updateMedia,
} from './model.ts';

export const uploadMedia = async (req: Request, res: Response) => {
  if (!req.file || !req.body) {
    return res.json({message: 'No file'});
  }

  const {filename, size, mimetype} = req.file;
  const {title, description, user_id} = req.body;

  if (filename && title && user_id) {
    const result = await addMedia({
      filename,
      size,
      mimetype,
      title,
      description,
      user_id,
    });
    if (result.media_id) {
      res.status(201);
      res.json({message: 'New media item added.', ...result});
    } else {
      res.status(500);
      res.json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

export const getAllmedia = async (_req: Request, res: Response) => {
  const result = await listAllMedia();
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};

export const getMediaById = async (req: Request, res: Response) => {
  const result = await listMediaById(Number(req.params.id));
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};

export const updateMediaItem = async (req: Request, res: Response) => {
  if (!req.body || Object.entries(req.body).length === 0) {
    return res.status(400).json({message: 'No request body'});
  }
  const result = await updateMedia(Number(req.params.id), {
    keys: Object.keys(req.body),
    values: Object.values(req.body),
  });
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};

export const deleteMediaItem = async (req: Request, res: Response) => {
  const result = await deleteMedia(Number(req.params.id));
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result);
};
