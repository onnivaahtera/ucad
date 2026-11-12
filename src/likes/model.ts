import type {RowDataPacket} from 'mysql2';
import promisePool from '../utils/database.ts';

export const getMediaItemLikes = async (id: number) => {
  try {
    const [rows] = await promisePool.query<RowDataPacket[]>(
      `SELECT COUNT(like_id) AS Likes FROM Likes WHERE media_id = ?`,
      [id],
    );
    if (rows.length === 0) {
      return {ok: false, error: 'Media item does not exist'};
    }
    return {ok: true, data: rows};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};

export const getUserLikedMedia = async (id: number) => {
  try {
    const [rows] = await promisePool.query<RowDataPacket[]>(
      `SELECT COUNT(like_id) AS Likes FROM Likes WHERE user_id = ?`,
      [id],
    );
    if (rows.length === 0) {
      return {ok: false, error: 'User does not exist'};
    }
    return {ok: true, data: rows};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};

export const addMediaItemLikes = async (id: number, user_id: number) => {
  try {
    const [result] = await promisePool.query(
      `INSERT INTO Likes (media_id, user_id) VALUES (?, ?) RETURNING *`,
      [id, user_id],
    );
    return {ok: true, data: result};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};

export const removeMediaItemLikes = async (id: number, user_id: number) => {
  try {
    const [result] = await promisePool.query(
      `DELETE FROM Likes WHERE media_id = (?) AND user_id = (?)`,
      [id, user_id],
    );
    return {ok: true, message: 'Like removed'};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};
