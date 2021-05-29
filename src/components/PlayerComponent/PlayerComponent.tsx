import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Player } from '../../interfaces/interfaces';
import SportsSrv from '../../services/SportsSrv';
import TeamCardComponent from '../TeamCardComponent/TeamCardComponent';
import './PlayerComponent.css';

const PlayerComponent = (props: any) => {

  const [player, setPlayer] = useState<Player>();

  const getTeam = async () => {
    console.log(`props`, props);
    const idPlayer = props.match.params.idPlayer;
    const player = await SportsSrv.getPlayerDetails(idPlayer);
    player.idPlayer = setPlayer(player);
  }

  const goBack = () => {
    props.history.goBack();
  }

  useEffect(() => {
    getTeam();
  }, [])

  return (
    <div className="team-details-component">
      <button className="btn btn-secondary fm-df fm-aliic fm-abs fm-ml-2" onClick={goBack}>
        <i className="fa fa-arrow-left fm-mr-2"></i>
        Go Back
      </button>
      <div className="team-details-container col-md-6 offset-3 fm-df fm-alist fm-fldc fm-p-3 fm-my-4">
        <div className="team-details fm-df fm-aliic fm-fldc">
          <div className="team-badge fm-df fm-global-center m-auto">
            <img src={player?.strCutout} alt="Team badge" className="fm-maw50" />
          </div>
          <div className="team-info">
            <h1 className="text-center fm-my-2">{player?.strPlayer}</h1>
            <h5 className="fm-df fm-aliic fm-jucb fm-mb-3">
              <span>
                Position: {player?.strPosition}
              </span>
              <span>{player?.strBirthLocation}</span>
            </h5>
            <p className="text-justify">{player?.strDescriptionEN}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerComponent;
