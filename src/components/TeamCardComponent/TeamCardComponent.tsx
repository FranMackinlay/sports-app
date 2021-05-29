import React, { FC } from 'react';
import { Card } from '../../interfaces/interfaces';
import { Link } from 'react-router-dom';
import './TeamCardComponent.css';

const TeamCard: FC<Card> = ({ team, player }) => {

  return (
    <li className={`card-li fm-mr-2 fm-mb-2 ${player?.idPlayer ? 'variant-player' : 'variant-team'}`}>
      <div className="card fm-p-2">
        <img className="card-img-top fm-maw50 fm-m-auto" src={player ? player.strCutout : team?.strTeamBadge} alt="Team Badge" />
        <div className="card-body p-0 fm-df fm-jucb fm-fldc">
          <h5 className="card-title text-center fm-w100 fm-df fm-global-center">{player ? player.strPlayer : team?.strAlternate}</h5>
          <p className="card-text">{player ? player.strPosition : team?.strDescriptionEN}</p>
          <Link to={`${player ? `/player/${player.idPlayer}` : `/team/${team?.idTeam}`}`} className="btn btn-primary">{`${player ? 'View player' : 'View team'}`}</Link>
        </div>
      </div>
    </li>
  );
};

export default React.memo(TeamCard);
