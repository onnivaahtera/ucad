import express from 'express';

const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  const values = {title: 'My REST API', message: 'Docs will be here!'};
  res.render('index', values);
});

app.get('/api/media', (req, res) => {});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
