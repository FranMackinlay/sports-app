import axios from 'axios';
import {Player} from '../interfaces/interfaces';

const API_URL = 'https://www.thesportsdb.com/api/v1/json/1';

const SportsSrv = {
  getTeams: async () => {
    const { data: { teams } } = await axios({
      method: 'get',
      url: `${API_URL}/lookup_all_teams.php?id=4335`,
    });
    return teams;
  },
  getTeamDetails: async (id: number) => {
    const { data: { teams } } = await axios({
      method: 'get',
      url: `${API_URL}/lookupteam.php?id=${id}`,
    });

    const response = Array.isArray(teams) ? teams[0] : teams;

    const { data: { players } } = await axios({
      method: 'get',
      url: `http://localhost:5000/api/team/${1}`,
    });

    response.players = players;

    return response;
  },
  getPlayerDetails: async (idPlayer: number) => {
    const { data: { player } } = await axios({
      method: 'get',
      url: `http://localhost:5000/api/player/${idPlayer}`,
    });

    return player;
  },
  editPlayer: async (newPlayer: Player, isNewPlayer: boolean) => {

    if (isNewPlayer) return SportsSrv.createPlayer(newPlayer);

    const {data: {upsertedPlayer}} = await axios.put(`http://localhost:5000/api/player/${newPlayer.idPlayer}`, { newPlayer });

    return upsertedPlayer;
  },
  createPlayer: async (newPlayer: Player) => {
    const {data: {createdPlayer}} = await axios.post(`http://localhost:5000/api/player`, { newPlayer });

    return createdPlayer;
  },
  removePlayerFromTeam: async (idPlayer: string) => {
    const {data: {isDeleteSuccess}} = await axios.delete(`http://localhost:5000/api/player/${idPlayer}`)

    return isDeleteSuccess;
  },
  getLeague: async () => {
    const { data: { leagues } } = await axios({
      method: 'get',
      url: `${API_URL}/lookupleague.php?id=4335`,
    });
    const response = Array.isArray(leagues) ? leagues[0] : leagues;
    return response;
  }
}

export default SportsSrv;
