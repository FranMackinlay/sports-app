import React, { useEffect, useState } from 'react';
import SportsSrv from '../../services/SportsSrv';
import './MainScreenComponent.css';

import { Team, League } from '../../interfaces/interfaces';
import TeamCard from '../TeamCardComponent/TeamCardComponent';
import LoadingBox from '../LoadingBox/LoadingBox';


const MainScreenComponent = () => {

  const [teams, setTeams] = useState<Team[]>([]);
  const [league, setLeague] = useState<League>();

  const getTeams = async () => {
    const teams = await SportsSrv.getTeams();
    teams.length && setTeams(teams);
  };

  const getLeague = async () => {
    const league = await SportsSrv.getLeague();
    setLeague(league);
  }

  useEffect(() => {
    getTeams();
    getLeague();
  }, [])

  return (
    <>
      {!teams.length || !league ? (
        <LoadingBox></LoadingBox>
      ) : (
          <div>
            <div className="spanish-league-container col-md-6 offset-3 fm-my-4">
              <img src={league?.strLogo} alt="" />
            </div>
            <div className="teams-container col-md-10 offset-1">
              {
                !teams.length ? (<LoadingBox></LoadingBox>) : (
                  <ul className="list-unstyled fm-df fm-flww">
                    {teams.map((team: Team) => (
                      <TeamCard key={team.idTeam} team={team}></TeamCard>
                    ))}
                  </ul>
                )
              }
            </div>
          </div>
      )}
    </>
  );
}

export default MainScreenComponent;
