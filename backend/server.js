import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import articlesRouter from './routers/articlesRouter.js';
import userRouter from './routers/userRouter.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/mistho', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});


app.use('/api/users', userRouter);
app.use('/api/articles', articlesRouter);

app.get('/', (req, res) => {
  res.send('Server is ready!');
});

app.use((error, req, res, next) => {
  if (error.message.includes('duplicate')) {
    error.message = 'Oh oh, there\'s an account with that email already!';
  }
  res.status(500).send({ message: error.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
