import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { getPlayers } from '../data.js';


const teamRouter = express.Router();

teamRouter.get('/:idTeam', expressAsyncHandler(async (req, res) => {
  const players = getPlayers()
  res.status(200).send({ players });
}));

export default teamRouter;
