import express from 'express';
import Category from '../models/Category';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (e) {
    return next(e);
  }
});

categoriesRouter.post('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const category = await Category.create({
      title: req.body.title,
      description: req.body.description,
    });

    return res.send(category);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

export default categoriesRouter;