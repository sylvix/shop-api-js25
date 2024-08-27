import express from 'express';
import { Product, ProductMutation } from '../types';
import {imagesUpload} from '../multer';
import mongoDb from '../mongoDb';
import { ObjectId } from 'mongodb';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    const db = mongoDb.getDb();
    const products = await db.collection('products').find().toArray();

    return res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const db = mongoDb.getDb();
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

    if (product === null) {
      return res.status(404).send({ error: 'Product not found' });
    }

    return res.send(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.price || !req.body.category) {
      return res.status(400).send({error: 'Title, price and category are required!'});
    }

    const product: ProductMutation = {
      category: new ObjectId(req.body.category as string),
      title: req.body.title,
      description: req.body.description,
      price: parseFloat(req.body.price),
      image: req.file ? req.file.filename : null,
    };

    const db = mongoDb.getDb();
    const result = await db.collection('products').insertOne(product);

    return res.send(result.insertedId);
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
