import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import productsRouter from './routers/products';
import categoriesRouter from './routers/categories';
import usersRouter from './routers/users';
import reviewsRouter from './routers/reviews';
import adminRouter from './routers/admin';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);
app.use('/reviews', reviewsRouter);
app.use('/admin', adminRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);

