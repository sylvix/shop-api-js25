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
    await db.dropCollection('users');
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

  await User.create({
    username: 'user@shop.local',
    password: '1qaz@WSX',
    confirmPassword: '1qaz@WSX',
    role: 'user',
    token: crypto.randomUUID(),
  }, {
    username: 'admin@shop.local',
    password: '1@345qWert',
    confirmPassword: '1@345qWert',
    role: 'admin',
    token: crypto.randomUUID(),
  });

  await db.close();
};

run().catch(console.error);