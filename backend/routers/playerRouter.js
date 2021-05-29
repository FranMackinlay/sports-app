import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import players from '../data.js';


const playerRouter = express.Router();

playerRouter.get('/:idPlayer', expressAsyncHandler(async (req, res) => {
  const idPlayer = req.params.idPlayer;

  const player = players.find(player => player.idPlayer === idPlayer);

  res.status(200).send({ player });
}));

export default playerRouter;
