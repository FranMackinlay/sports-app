import React, { FC } from 'react';
import { Card } from '../../interfaces/interfaces';
import { Link } from 'react-router-dom';
import './CardComponent.css';

const TeamCard: FC<Card> = ({ cardData }) => {

  return (
    <li className="card-li fm-mr-2 fm-mb-2">
      <div className="card fm-p-2">
        <img className="card-img-top fm-maw50 fm-m-auto" src={cardData.strTeamBadge} alt="Team Badge" />
        <div className="card-body p-0">
          <h5 className="card-title fm-df fm-aliic">{cardData.strAlternate}</h5>
          <p className="card-text">{cardData.strDescriptionEN}</p>
          <Link to={`/team/${cardData.idTeam}`} className="btn btn-primary">View team</Link>
        </div>
      </div>
    </li>
  );
};

export default React.memo(TeamCard);
