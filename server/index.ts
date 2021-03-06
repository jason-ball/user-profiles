import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import './auth/Strategy';

import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';

async function main() {
  await mongoose.connect(process.env.DB_URL ?? '');

  const app = express();
  // Express middlewares
  app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY ?? 'define-a-key-in-the-env-file'],
    maxAge: 24 * 60 * 60 * 100,
    domain: process.env.COOKIE_DOMAIN ?? 'localhost',
  }));
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    cors({
      origin: process.env.CLIENT_URL ?? 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use('/static', express.static('build/static', {
    etag: false,
    maxAge: 0,
  }));
  app.use(fileUpload());
  // Express routes (from routes folder)
  app.use('/user', userRoute);
  app.use('/auth', authRoute);

  app.listen(process.env.PORT);
}

// eslint-disable-next-line no-console
main().catch((err) => console.log(err));
