import express from 'express';
import auth from '../../middleware/auth';
import permit from '../../middleware/permit';
import adminProductsRouter from './products';

const adminRouter = express.Router();

adminRouter.use(auth, permit('admin'));
adminRouter.use('/products', adminProductsRouter);

export default adminRouter;