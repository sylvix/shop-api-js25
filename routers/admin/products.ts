import express from 'express';
import mongoose from 'mongoose';
import { imagesUpload } from '../../multer';
import Product from '../../models/Product';

const adminProductsRouter = express.Router();

// /admin/products
adminProductsRouter.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().populate('category', 'title');
    return res.send(products);
  } catch (error) {
    next(error);
  }
});

adminProductsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
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

export default adminProductsRouter;