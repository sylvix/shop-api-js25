import express from 'express';
import fileDb from '../fileDb';
import {ProductMutation} from '../types';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  const products = await fileDb.getItems();
  return res.send(products);
});

productsRouter.get('/:id', async (req, res) => {
  const products = await fileDb.getItems();
  const product = products.find(p => p.id === req.params.id);
  return res.send(product);
});

productsRouter.post('/', async (req, res) => {
  if (!req.body.title || !req.body.price) {
    return res.status(400).send({error: 'Title and price are required!'});
  }

  const product: ProductMutation = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  };

  const savedProduct = await fileDb.addItem(product);
  return res.send(savedProduct);
});

export default productsRouter;
