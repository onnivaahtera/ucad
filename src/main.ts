import express from 'express';
import mediaRouter from './media/routes.ts';
import userRouter from './user/routes.ts';
import likeRouter from './likes/routes.ts';
import {logRequest} from './middlewares/logger.ts';
import authRouter from './auth/routes.ts';
import {errorHandler, notFoundHandler} from './middlewares/error-handler.ts';

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.use(express.json());
app.use(logRequest);

app.get('/', (_req, res) => {
  const values = {
    title: 'My REST API',
    message: 'Api to fetch users and their media',
  };
  res.status(200).render('index', values);
});

app.use(
  '/media',
  express.static('uploads', {
    setHeaders: (res) => {
      res.setHeader('Content-Type', 'image/jpeg');
    },
  }),
);

app.use('/api/media', mediaRouter);

app.use('/api/users', userRouter);

app.use('/api/likes/', likeRouter);

app.use('/api/auth', authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
