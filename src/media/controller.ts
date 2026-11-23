import type {Request, Response} from 'express';
import {
  addMedia,
  deleteMedia,
  listAllMedia,
  listMediaById,
  updateMedia,
} from './model.ts';

export const uploadMedia = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({error: 'Invalid or missing file'});
  }
  const {filename, size, mimetype} = req.file;
  const {title, description} = req.body;
  if (!req.user || typeof req.user === 'string') return res.sendStatus(401);
  const user_id = (req.body.user_id = req.user?.user_id);
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
  const result = await updateMedia(Number(req.params.id), req.user, {
    keys: Object.keys(req.body),
    values: Object.values(req.body),
  });
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};

export const deleteMediaItem = async (req: Request, res: Response) => {
  if (!req.user || typeof req.user === 'string') return res.sendStatus(401);
  console.log(req.user);
  const result = await deleteMedia(Number(req.params.id), req.user);
  if (!result.ok) {
    return res.status(404).json({message: result.error});
  }
  return res.json(result);
};
