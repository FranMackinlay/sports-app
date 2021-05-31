import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import teamRouter from './routers/teamRouter.js';
import playerRouter from './routers/playerRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/team', teamRouter);
app.use('/api/player', playerRouter);

app.get('/', (req, res) => {
  res.send('Server is ready!');
});

app.use((error, req, res, next) => {
  res.status(500).send({ message: error.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
