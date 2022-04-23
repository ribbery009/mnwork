import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import {newtime} from './routes/newtime';
import {isHere} from './routes/isHere';
import {close} from './routes/close';
import { deleteTime } from './routes/deletetime';
import { errorHandler,NotFoundError } from '@mnwork/common';
import { getTime } from './routes/get-time';
import { getActiveMembers } from './routes/activemembers';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false
  })
);

app.use(newtime);
app.use(isHere);
app.use(close);
app.use(getTime);
app.use(getActiveMembers);
app.use(deleteTime);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };