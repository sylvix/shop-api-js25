import express from 'express';
import mysqlDb from '../mysqlDb';
import { Category } from '../types';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const result = await mysqlDb.getConnection().query('' +
      'SELECT * FROM categories'
    );
    const categories = result[0] as Category[];
    return res.send(categories);
  } catch (e) {
    next(e);
  }
});

export default categoriesRouter;