import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import mongoose from 'mongoose';
import Review from '../models/Review';

const reviewsRouter = express.Router();

reviewsRouter.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.find({product: req.query.product});
    return res.send(reviews);
  } catch (error) {
    return next(error);
  }
});

reviewsRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const review = await Review.create({
      user: user ? user._id : null,
      product: req.body.product,
      text: req.body.text,
      review: req.body.review,
    });

    return res.send(review);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

reviewsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const review = await Review.findOne({_id: req.params.id});

    if (!review) {
      return res.status(404).send({error: 'Not found'});
    }

    if (review.user.toString() === user?._id.toString() || user?.role === 'admin') {
      await Review.deleteOne({_id: req.params.id});
    } else {
      return res.status(403).send({error: 'Unauthorized'});
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

export default reviewsRouter;