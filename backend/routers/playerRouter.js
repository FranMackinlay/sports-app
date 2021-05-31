import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import players, { findPlayer, updatePlayer, createPlayer, removePlayer } from '../data.js';

const playerRouter = express.Router();

playerRouter.get('/:idPlayer', expressAsyncHandler(async (req, res) => {
  const idPlayer = req.params.idPlayer;

  const player = findPlayer(idPlayer);

  res.status(200).send({ player });
}));

playerRouter.put('/:idPlayer', expressAsyncHandler(async (req, res) => {
  const idPlayer = req.params.idPlayer;
  const { newPlayer } = req.body;

  let upsertedPlayer = updatePlayer(newPlayer, idPlayer);

  res.status(200).send({ upsertedPlayer });
}));

playerRouter.post('/', expressAsyncHandler(async (req, res) => {

  const { newPlayer } = req.body;

  const idPlayer = Math.floor(100000000 + Math.random() * 800000000);

  newPlayer.idPlayer = idPlayer;

  const playerExists = players.find(player => player.idPlayer.toString() === idPlayer.toString());

  if (!playerExists) {
    createPlayer(newPlayer)
  }

  res.status(200).send({ createdPlayer: newPlayer });
}));

playerRouter.delete('/:idPlayer', expressAsyncHandler(async (req, res) => {
  const idPlayer = req.params.idPlayer;

  removePlayer(idPlayer);

  res.status(200).send({ isDeleteSuccess: true });
}));

export default playerRouter;
