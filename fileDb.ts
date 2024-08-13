import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Product, ProductMutation} from './types';

const filename = './db.json';
let data: Product[] = [];

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },
  async getItems() {
    return data;
  },
  async addItem(item: ProductMutation) {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const product = {id, ...item, createdAt};
    data.push(product);
    await this.save();
    return product;
  },
  async save() {
    return fs.writeFile(filename, JSON.stringify(data, null, 2));
  }
};

export default fileDb;
