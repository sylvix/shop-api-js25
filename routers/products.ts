import express from 'express';
import fileDb from '../fileDb';
import {ProductWithoutId} from '../types';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  const products = await fileDb.getItems();
  res.send(products);
});

productsRouter.get('/:id', async (req, res) => {
  const products = await fileDb.getItems();
  const product = products.find(p => p.id === req.params.id);
  res.send(product);
});

productsRouter.post('/', async (req, res) => {
  const product: ProductWithoutId = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  };

  const savedProduct = await fileDb.addItem(product);
  res.send(savedProduct);
});

export default productsRouter;
