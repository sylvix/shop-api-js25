import mongoose from 'mongoose';
import config from './config';
import Category from './models/Category';
import Product from './models/Product';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('products');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const [
    cpuCategory,
    gpuCategory
  ] = await Category.create({
    title: 'CPUs',
    description: 'Central Processing Units',
  }, {
    title: 'GPUs',
    description: 'Graphic Processing Units',
  }, {
    title: 'SSDs',
    description: 'Solid State Drives',
  });

  await Product.create({
    title: 'Intel Core i9',
    price: 500,
    category: cpuCategory,
    image: 'fixtures/cpu.jpg',
  }, {
    title: 'Nvidia RTX 4090',
    price: 1200,
    category: gpuCategory,
    image: 'fixtures/gpu.webp',
  });

  const user = new User({
    username: 'user',
    password: '1qaz@WSX',
  });
  user.generateToken();
  await user.save();

  await db.close();
};

run().catch(console.error);