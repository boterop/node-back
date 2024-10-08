import './src/config/globals.js';
import express from 'express';
import cors from 'cors';
import guardian from './src/middlewares/guardian.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(guardian);

app.get('/api', (_req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  logger.info('Server is running on port 3000');
});
