import mongoose, { Types } from 'mongoose';
import { ReviewFields } from '../types';
import User from './User';
import Product from './Product';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema<ReviewFields>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    }
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const product = await Product.findById(value);
        return Boolean(product);
      },
      message: 'Product does not exist',
    }
  },
  text: {
    type: String,
    required: true,
  },
  review: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  }
});

const Review = mongoose.model<ReviewFields>('Review', ReviewSchema);

export default Review;