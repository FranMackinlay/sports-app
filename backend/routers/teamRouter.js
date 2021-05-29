import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';
import axios from 'axios';
import players from '../data.js';


const teamRouter = express.Router();

teamRouter.get('/:idTeam', expressAsyncHandler(async (req, res) => {
  res.status(200).send({ players });
}));

export default teamRouter;
