import axios from 'axios';

const API_URL = 'https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4335';

const SportsSrv = {
  getTeams: async () => {
    const { data: { teams } } = await axios({
      method: 'get',
      url: API_URL,
    });
    return teams;
  },
  getTeamPlayers: async () => {

  },
  getPlayer: async () => {

  },
  createPlayer: async () => {

  },
  removePlayerFromTeam: async () => {

  },
}

export default SportsSrv;
