import express from 'express';
import { Product, ProductMutation } from '../types';
import {imagesUpload} from '../multer';
import mysqlDb from '../mysqlDb';
import { ResultSetHeader } from 'mysql2';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  const result = await mysqlDb.getConnection().query(
    'SELECT * FROM products'
  );

  const products = result[0] as Product[];
  return res.send(products);
});

productsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await mysqlDb.getConnection().query(
    `SELECT * FROM products WHERE id = ?`,
    [id]
  );
  const products = result[0] as Product[];

  if (products.length === 0) {
    return res.status(404).send({ error: 'Product not found' });
  }

  return res.send(products[0]);
});

productsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  if (!req.body.title || !req.body.price) {
    return res.status(400).send({error: 'Title and price are required!'});
  }

  const product: ProductMutation = {
    category_id: parseInt(req.body.category_id),
    title: req.body.title,
    description: req.body.description,
    price: parseFloat(req.body.price),
    image: req.file ? req.file.filename : null,
  };

  const insertResult = await mysqlDb.getConnection().query(
    'INSERT INTO products (category_id, title, description, price, image) VALUES (?, ?, ?, ?, ?)',
    [product.category_id, product.title, product.description, product.price, product.image],
  );

  const resultHeader = insertResult[0] as ResultSetHeader;

  const getNewResult = await mysqlDb.getConnection().query(
    'SELECT * FROM products WHERE id = ?',
    [resultHeader.insertId]
  );

  const products = getNewResult[0] as Product[];

  return res.send(products[0]);
});

export default productsRouter;
