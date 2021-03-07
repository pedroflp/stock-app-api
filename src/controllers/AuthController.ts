import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

export default {
  async authenticate(req: Request, res: Response) {
    const repository = await getRepository(User);
    const { username, password } = req.body;
    
    const user = await repository.findOne({ where: { username } });
    
    if (!user) {
      return res.sendStatus(401).json({ message: 'Usuário inválido' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(401).json({ message: 'Senha inválida' });
    }

    const token = jwt.sign({ id: user.id }, 'secret', {
      expiresIn: '3d',
    });

    return res.json({ 
      user, 
      token
    })

  },
}