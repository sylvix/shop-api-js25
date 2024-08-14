import express from 'express';
import productsRouter from './routers/products';
import fileDb from './fileDb';
import cors, {CorsOptions} from 'cors';
import config from './config';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/products', productsRouter);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

run().catch(console.error);

