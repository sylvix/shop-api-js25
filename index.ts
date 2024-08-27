import express from 'express';
import productsRouter from './routers/products';
import cors from 'cors';
import config from './config';
import categoriesRouter from './routers/categories';
import mongoDb from './mongoDb';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

const run = async () => {
  await mongoDb.connect();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoDb.disconnect();
  });
};

run().catch(console.error);

