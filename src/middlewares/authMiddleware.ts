import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

import User from '../models/User';

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  const repository = await getRepository(User);

  const user = await repository.findOne({ where: { username } });

  if (!user) {
    return res.status(400).json({ message: `Usuário ${username} inválido` });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!(username && isValidPassword)) {
    return res.status(400).json({ message: 'Usuário ou senha incorretos' });
  }

  return next();
}