import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import User from '../models/User';
import users_views from '../views/users_views';

export default {
  async index(req: Request, res: Response) {
    const id = req.params.id;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail({ where: { id }, relations: ['products']});

    return res.json(users_views.render(user));
  },

  async store(req: Request, res: Response) {
    const user = await getRepository(User);
    const { username, email, password } = req.body;

    const userExists = await user.findOne({ where: { username, email } });

    if (userExists) {
      return res.sendStatus(409).json({ message: 'Usuário ou email já em uso!'} );
    }
    
    const data = {
      username,
      email,
      password,
    }

    const schema = Yup.object().shape({
      username: Yup.string().required('Username obrigatório').max(15),
      email: Yup.string().required('Email obrigatório'),
      password: Yup.string().required('Senha obrigatória')
    });

    await schema.validate(data, {
      abortEarly: false,
    })

    const newUser = user.create(data);
    await user.save(newUser);
    return res.json(newUser);
  },

  async delete(req: Request, res: Response){
    const usernameParam = req.params.username;

    const userRepository = getRepository(User);

    const {
      username,
    } = req.body;
  
    const userExists = await userRepository.findOne({ where: { usernameParam } });

    if (!userExists) {
      return res.json({ message: `O usuário ${username} não foi encontrado!` });
    } 
    else if (username == usernameParam) {
      
      const user = await userRepository.findOneOrFail({ where: { username } });
    
      await getRepository(User).delete(user);

      return res.json({ message: `Usuário ${username} deletado`});
    } 
    else {
      return res.json({ message: `Usuário ${username} não pode deletar ${usernameParam}`})
    }   
  }
}