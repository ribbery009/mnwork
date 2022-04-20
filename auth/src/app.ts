import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { getUsers } from './routes/get-users';
import { getUser } from './routes/get-user';
import { deleteUser } from './routes/delete';
import { userEditRouter } from './routes/useredit';
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

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(getUsers);
app.use(getUser);
app.use(userEditRouter);
app.use(deleteUser);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };