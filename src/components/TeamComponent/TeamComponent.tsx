import React, { useEffect, useState } from 'react';
import { Team } from '../../interfaces/interfaces';
import SportsSrv from '../../services/SportsSrv';

const TeamComponent = (props: any) => {

  const [team, setTeam] = useState<Team>();

  const getTeam = async () => {
    const idTeam = props.match.params.idTeam;
    const team = await SportsSrv.getTeamDetails(idTeam);
    team.idTeam && setTeam(team);
  }

  useEffect(() => {
    getTeam();
  }, [])

  return (
    <div className="team-details-container col-md-12">
      <div className="col-md-6 team-info">
        <h2>{team?.strAlternate}</h2>

      </div>
      <div className="col-md-6 team-badge">
        <img src={team?.strTeamBadge} alt="Team badge" />
      </div>
    </div>
  );
}

export default TeamComponent;
