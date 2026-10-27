import express from 'express';
import {media, users} from './data.ts';

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.use(express.json());

app.get('/', (req, res) => {
  const values = {
    title: 'My REST API',
    message: 'Api to fetch users and their media',
  };
  res.status(200).render('index', values);
});

app.use('/media', express.static('media'));

app.get('/api/media', (req, res) => {
  res.status(200).json({Message: 'Media found succsessfully', Data: media});
});

app.get('/api/media/:id', (req, res) => {
  const item = media.find((i) => i.media_id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({Message: 'Media not found'});
  }
  return res
    .status(200)
    .json({Message: 'Media found succsessfully', Data: item});
});

app.post('/api/media', (req, res) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({Message: 'No request body'});
  }
  return res.send(200).json({Message: 'Media added succsessfully', Data: body});
});

app.put('/api/media/:id', (req, res) => {
  const item = media.find((i) => i.media_id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({Message: 'Media not found'});
  }
  return res
    .status(200)
    .json({Message: 'Media modified succsessfully', Data: item});
});

app.delete('/api/media/:id', (req, res) => {
  const item = media.find((i) => i.media_id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({Message: 'Media not found'});
  }
  return res
    .status(200)
    .json({Message: 'Media deleted succsessfully', Data: item});
});

app.get('/api/user', (req, res) => {
  res.status(200).json({Message: 'Users found succsessfully', Data: users});
});

app.get('/api/user/:id', (req, res) => {
  const item = users.find((i) => i.user_id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({Message: 'User not found'});
  }
  return res
    .status(200)
    .json({Message: 'User found succsessfully', Data: item});
});

app.post('/api/user', (req, res) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({Message: 'No request body'});
  }
  return res
    .status(200)
    .json({Message: 'User added succsessfully', Data: body});
});

app.put('/api/user/:id', (req, res) => {
  const item = users.find((i) => i.user_id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({Message: 'User not found'});
  }
  return res
    .status(200)
    .json({Message: 'User modified succsessfully', Data: item});
});

app.delete('/api/user/:id', (req, res) => {
  const item = users.find((i) => i.user_id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({Message: 'User not found'});
  }
  return res
    .status(200)
    .json({Message: 'User deleted succsessfully', Data: item});
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
