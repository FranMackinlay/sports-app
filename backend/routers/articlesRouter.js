import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';


const articlesRouter = express.Router();

articlesRouter.get('/', isAuth, expressAsyncHandler(async (req, res) => {



  res.status(200).send();
}));

articlesRouter.get('/:articleSlug', isAuth, expressAsyncHandler(async (req, res) => {

  const { link } = req.query;


  res.status(200).send();
}));

export default articlesRouter;
