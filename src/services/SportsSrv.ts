import axios from 'axios';

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
  createPlayer: async () => {

  },
  removePlayerFromTeam: async () => {

  },
}

export default SportsSrv;
