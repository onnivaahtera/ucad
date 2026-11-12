import type {RowDataPacket} from 'mysql2';
import promisePool from '../utils/database.ts';

export const listAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Users');
    return {ok: true, data: rows};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};

export const listUserById = async (id: number) => {
  try {
    const [rows] = await promisePool.query<RowDataPacket[]>(
      `SELECT * FROM Users WHERE user_id = ?`,
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

export const createUser = async (data: (string | unknown)[]) => {
  try {
    const [_result] = await promisePool.query(
      `INSERT INTO Users (username, password, email, user_level_id) VALUES (?, ?, ?, ?)`,
      [...data],
    );
    return {ok: true, message: 'User created'};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};

export const updateUser = async (
  id: number,
  data: {keys: string[]; values: (string | unknown)[]},
) => {
  const cols = data.keys.map((col) => `${col} = ?`).join(', ');
  try {
    const [result] = await promisePool.query(
      `UPDATE Users SET ${cols} WHERE user_id = ? RETURNING *`,
      [...data.values, id],
    );

    console.log(result);
    return {ok: true, data: result};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};

export const removeUser = async (id: number) => {
  try {
    const connection = await promisePool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query(
        `DELETE FROM Comments WHERE user_id = ? OR media_id IN (SELECT media_id FROM MediaItems WHERE user_id = ?);`,
        [id, id],
      );
      await connection.query(
        `DELETE FROM Likes WHERE user_id = ? OR media_id IN (SELECT media_id FROM MediaItems WHERE user_id = ?);`,
        [id, id],
      );
      await connection.query(
        `DELETE FROM Ratings WHERE user_id = ? OR media_id IN (SELECT media_id FROM MediaItems WHERE user_id = ?);`,
        [id, id],
      );
      await connection.query(
        `DELETE FROM MediaItemTags WHERE media_id IN (SELECT media_id FROM MediaItems WHERE user_id = ?);`,
        [id],
      );
      await connection.query(`DELETE FROM MediaItems WHERE user_id = ?;`, [id]);
      const [_result] = await connection.query(
        `DELETE FROM Users WHERE user_id = ?;`,
        [id],
      );
      await connection.commit();
      return {ok: true, message: 'User deleted'};
    } catch (e) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error('error rolling back user deletion', rollbackError);
      }
      throw e;
    } finally {
      connection.release();
    }
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};
