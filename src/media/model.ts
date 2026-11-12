import type {ResultSetHeader, RowDataPacket} from 'mysql2';
import promisePool from '../utils/database.ts';

export const listAllMedia = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM MediaItems');
    return {ok: true, data: rows};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};

export const listMediaById = async (id: number) => {
  try {
    const [rows] = await promisePool.query<RowDataPacket[]>(
      `SELECT * FROM MediaItems WHERE media_id = ?`,
      [id],
    );
    if (rows.length === 0) {
      if (rows.length === 0) {
        return {ok: false, error: 'Media item does not exist'};
      }
    }
    return {ok: true, data: rows};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};

export const updateMedia = async (
  id: number,
  data: {keys: string[]; values: (string | unknown)[]},
) => {
  const cols = data.keys.map((col) => `${col} = ?`).join(', ');
  try {
    const [result] = await promisePool.query(
      `UPDATE MediaItems SET ${cols} WHERE media_id = ? RETURNING *`,
      [...data.values, id],
    );
    console.log(result);
    return {ok: true, data: result};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};

export const deleteMedia = async (id: number) => {
  try {
    const connection = await promisePool.getConnection();
    await connection.beginTransaction();
    await connection.query(`DELETE FROM Comments WHERE media_id = ?;`, [id]);
    await connection.query(`DELETE FROM Likes WHERE media_id = ?;`, [id]);
    await connection.query(`DELETE FROM Ratings WHERE media_id = ?;`, [id]);
    await connection.query(`DELETE FROM MediaItemTags WHERE media_id = ?;`, [
      id,
    ]);
    const [result] = await connection.query(
      `DELETE FROM MediaItems WHERE media_id = ?;`,
      [id],
    );
    await connection.commit();
    console.log(result);
    return {ok: true, message: 'Media deleted'};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};

export const addMedia = async (media: mediaType) => {
  const {user_id, filename, size, mimetype, title, description} = media;
  try {
    const rows = await promisePool.execute<ResultSetHeader>(
      `INSERT INTO mediaItems (user_id, filename, filesize, media_type, title, description)
               VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, filename, size, mimetype, title, description],
    );
    console.log('rows', rows);
    return {media_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e);
    return {error: e};
  }
};

interface mediaType {
  user_id: number;
  filename: string;
  size: number;
  mimetype: string;
  title: number;
  description: string;
}
