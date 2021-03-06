import "reflect-metadata";

import express from 'express';

import routes from './index';

import middleware from './middleware/validationUUID';

import './database';

const app = express();

app.use(express.json());
app.use(middleware);
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
