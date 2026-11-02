import express from 'express';
import {
  deleteMediaItem,
  getMediaById,
  media,
  modifyMediaItem,
} from './media.ts';
import {deleteUser, getUserById, modifyUser, users} from './users.ts';

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
  res.status(200).json({Message: 'Media found', Data: media});
});

app.get('/api/media/:id', (req, res) => {
  const item = getMediaById(req.params.id);

  if (!item) {
    return res.status(404).json({Message: 'Media not found'});
  }
  return res.status(200).json({Message: 'Media found ', Data: item});
});

app.post('/api/media', (req, res) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({Message: 'No request body'});
  }

  media.unshift(body);
  return res.status(200).json({Message: 'Media added', Data: body});
});

app.put('/api/media/:id', (req, res) => {
  const item = modifyMediaItem(req.params.id, req.body);

  if (!item) {
    return res.status(404).json({Message: 'Media not found'});
  }
  return res.status(200).json({Message: 'Media modified', Data: item});
});

app.delete('/api/media/:id', (req, res) => {
  const success = deleteMediaItem(req.params.id);

  if (!success) {
    return res.status(404).json({Message: 'Media not found'});
  }
  return res.status(200).json({Message: 'Media deleted'});
});

app.get('/api/user', (req, res) => {
  res.status(200).json({Message: 'Users found', Data: users});
});

app.get('/api/user/:id', (req, res) => {
  const item = getUserById(req.params.id);

  if (!item) {
    return res.status(404).json({Message: 'User not found'});
  }
  return res.status(200).json({Message: 'User found', Data: item});
});

app.post('/api/user', (req, res) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({Message: 'No request body'});
  }
  users.unshift(body);
  return res.status(200).json({Message: 'User added', Data: body});
});

app.put('/api/user/:id', (req, res) => {
  const item = modifyUser(req.params.id, req.body);
  if (!item) {
    return res.status(404).json({Message: 'User not found'});
  }
  return res.status(200).json({Message: 'User modified', Data: item});
});

app.delete('/api/user/:id', (req, res) => {
  const success = deleteUser(req.params.id);

  if (!success) {
    return res.status(404).json({Message: 'User not found'});
  }
  return res.status(200).json({Message: 'User deleted'});
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
