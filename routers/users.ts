import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();

    await user.save();
    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

// /users/sessions
usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
      return res.status(400).send({error: 'Username not found!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({error: 'Password is wrong!'});
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    return next(error);
  }
});

// /users/secret
usersRouter.post('/secret', async (req, res, next) => {
  const headerValue = req.get('Authorization');
  console.log(headerValue);
  if (!headerValue) {
    return res.status(401).send({error: 'Header "Authorization" not found'});
  }

  const [_bearer, token] = headerValue.split(' ');

  if (!token) {
    return res.status(401).send({error: 'Token not found'});
  }

  const user = await User.findOne({token});

  if (!user) {
    return res.status(401).send({error: 'Wrong Token!'});
  }

  return res.send('Secret text');
});

export default usersRouter;