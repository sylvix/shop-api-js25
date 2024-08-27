import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  image: String,
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;