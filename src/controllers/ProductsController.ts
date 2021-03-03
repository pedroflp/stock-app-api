import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Product from '../models/Product';
import productView from '../views/products_views';

export default {
  async index(req: Request, res: Response) {
    const productsRepository = getRepository(Product);

    const products = await productsRepository.find();

    return res.json(productView.renderMany(products));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOneOrFail(id);

    return res.json(productView.render(product));
  },

  async create(req: Request, res: Response) {
    const {
      id,
      name,
      quantity,
      price
    } = req.body;
  
    const productsRepository = getRepository(Product);
  
    const data = {
      id,
      name,
      quantity,
      price
    }

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório').max(100),
      quantity: Yup.number().required('Quantidade obrigatória'),
      price: Yup.number().required('Preço obrigatório')
    });

    await schema.validate(data, {
      abortEarly: false,
    })

    const product = productsRepository.create(data);
  
    await productsRepository.save(product);
  
    return res.json(data);
  },

  async edit(req: Request, res: Response) {
    const id = req.params.id;

    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOneOrFail(id);
    productsRepository.merge(product, req.body);

    await getRepository(Product).save(product);
  
    return res.json({ message: `Produto: ${id}, foi editado!` });
  },

  async delete(req: Request, res: Response){
    const id = req.params.id
    await getRepository(Product).delete(id)

    return res.json({ message: `Produto: ${id} deletado`});
  }
}