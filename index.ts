import express from 'express';
import productsRouter from './routers/products';
import cors from 'cors';
import config from './config';
import mysqlDb from './mysqlDb';
import categoriesRouter from './routers/categories';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

const run = async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

run().catch(console.error);

