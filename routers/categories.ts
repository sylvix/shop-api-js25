import express from 'express';
import Category from '../models/Category';
import mongoose from 'mongoose';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (e) {
    return next(e);
  }
});

categoriesRouter.post('/', async (req, res, next) => {
  try {
    const categoryData = {
      title: req.body.title,
      description: req.body.description,
    };

    const category = new Category(categoryData);
    await category.save();
    return res.send(category);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

export default categoriesRouter;