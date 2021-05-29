import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Team } from '../../interfaces/interfaces';
import SportsSrv from '../../services/SportsSrv';
import TeamCardComponent from '../TeamCardComponent/TeamCardComponent';
import './TeamComponent.css';

const TeamComponent = (props: any) => {

  const [team, setTeam] = useState<Team>();

  const getTeam = async () => {
    const idTeam = props.match.params.idTeam;
    const team = await SportsSrv.getTeamDetails(idTeam);
    console.log(`team`, team);
    team.idTeam && setTeam(team);
  }

  useEffect(() => {
    getTeam();
  }, [])

  return (
    <div className="team-details-component">
      <Link to="/">
        <button className="btn btn-secondary fm-df fm-aliic fm-abs fm-ml-2">
          <i className="fa fa-arrow-left fm-mr-2"></i>
            Go Back
        </button>
      </Link>
      <div className="team-details-container col-md-6 offset-3 fm-df fm-alist fm-fldc fm-p-3 fm-my-4">
        <div className="team-details fm-df fm-aliic fm-fldc">
          <div className="team-badge fm-df fm-global-center m-auto">
            <img src={team?.strTeamBadge} alt="Team badge" className="fm-maw50" />
          </div>
          <div className="team-info">
            <h1 className="text-center fm-my-2">{team?.strAlternate}</h1>
            <p className="text-justify">{team?.strDescriptionEN}</p>
          </div>
        </div>
        <div className="col-md-12 p-0 team-stadium-details-container fm-mt-3">
          <h1 className="fm-mb-2">Stadium Details</h1>
          <div className="stadium-info">
            <img src={team?.strStadiumThumb} alt="Stadium thumbnail" className="fm-mb-2" />
            <p>{team?.strStadiumDescription}</p>
          </div>
        </div>
        <div className="col-md-12 p-0 team-players-details-container fm-mt-3">
          <h1 className="fm-mb-2">Players</h1>
          <div className="players-info">
            <ul className="list-unstyled fm-df fm-aliic fm-flww">
              {team?.players.length ? team.players.map(player => (
                <TeamCardComponent key={player.idPlayer} player={player}></TeamCardComponent>
                ))
              : (
                <div>We couldn't find any players for this team, try again later!</div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamComponent;
