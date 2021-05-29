import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import players from '../data.js';

let playersTmp = players;

const playerRouter = express.Router();

playerRouter.get('/:idPlayer', expressAsyncHandler(async (req, res) => {
  const idPlayer = req.params.idPlayer;

  const player = playersTmp.find(player => player.idPlayer.toString() === idPlayer);

  res.status(200).send({ player });
}));

playerRouter.put('/:idPlayer', expressAsyncHandler(async (req, res) => {
  const idPlayer = req.params.idPlayer;
  const { newPlayer } = req.body;
  let upsertedPlayer;

  playersTmp = players.map(player => {
    if (player.idPlayer === idPlayer) {
      player = newPlayer
      upsertedPlayer = player;
    };
    return player;
  });

  res.status(200).send({ upsertedPlayer });
}));

export default playerRouter;
