import express from 'express';
import {imagesUpload} from '../multer';
import Product from '../models/Product';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    const filter: Record<string, unknown> = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter).populate('category', 'title');
    return res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product === null) {
      return res.status(404).send({ error: 'Product not found' });
    }

    return res.send(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.post('/', auth, permit('admin'), imagesUpload.single('image'), async (req, res, next) => {
  try {
    const product = await Product.create({
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      price: parseFloat(req.body.price),
      image: req.file ? req.file.filename : null,
    });

    return res.send(product);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

export default productsRouter;
