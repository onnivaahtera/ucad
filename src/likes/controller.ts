import {
  addMediaItemLikes,
  getMediaItemLikes,
  getUserLikedMedia,
  removeMediaItemLikes,
} from './model.ts';
import type {Request, Response} from 'express';

export const getMediaLikes = async (req: Request, res: Response) => {
  const result = await getMediaItemLikes(Number(req.params.id));
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};

export const getUserLikes = async (req: Request, res: Response) => {
  const result = await getUserLikedMedia(Number(req.params.id));
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};

export const addMediaLikes = async (req: Request, res: Response) => {
  const result = await addMediaItemLikes(
    Number(req.params.media_id),
    Number(req.params.user_id),
  );
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};

export const removeMediaLikes = async (req: Request, res: Response) => {
  const result = await removeMediaItemLikes(
    Number(req.params.media_id),
    Number(req.params.user_id),
  );
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result);
};
