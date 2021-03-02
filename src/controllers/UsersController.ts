import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';

export default {
  index(req: Request, res: Response) {
    return res.send({ userID: req.userId });
  },

  async authenticate(req: Request, res: Response) {
    const repository = await getRepository(User);

    const { name, email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: '10d'
    })

    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    }

    return res.json(data)

  },

  async store(req: Request, res: Response) {
    const user = await getRepository(User);

    const { name, email, password } = req.body;

    const userExists = await user.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(409);
    }

    const data = {
      name,
      email,
      password,
    }

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório').max(20),
      email: Yup.string().required('Email obrigatória'),
      password: Yup.string().required('Senha obrigatório')
    });

    await schema.validate(data, {
      abortEarly: false,
    })

    const newUser = user.create(data);

    await user.save(newUser);

    return res.json(newUser);
  }
}