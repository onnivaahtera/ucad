import jwt from 'jsonwebtoken';
import {getUserByUsername} from '../user/model.ts';
import type {Request, Response} from 'express';
import 'dotenv/config';

export const postLogin = async (req: Request, res: Response) => {
  const {username, password} = req.body;

  const user = await getUserByUsername(username);

  if (!user.ok || !user.data) {
    return res.status(500).json({error: user.message});
  }

  if (user.data[0].password === password) {
    const token = jwt.sign(user.data[0], process.env.JWT_SECRET!, {
      expiresIn: '24h',
    });
    return res.json({user, token});
  }
};

export const getMe = async (req: Request, res: Response) => {
  console.log('getMe', req.user);
  if (req.user) {
    res.json({message: 'token ok', user: req.user});
  } else {
    res.sendStatus(401);
  }
};
