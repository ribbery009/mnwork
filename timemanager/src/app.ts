import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import {newtime} from './routes/newtime';
import {isHere} from './routes/isHere';
import {close} from './routes/close';

import { errorHandler,NotFoundError } from '@mnwork/common';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

app.use(newtime);
app.use(isHere);
app.use(close);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };