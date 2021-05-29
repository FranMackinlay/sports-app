import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Player } from '../../interfaces/interfaces';
import SportsSrv from '../../services/SportsSrv';
import TeamCardComponent from '../TeamCardComponent/TeamCardComponent';
import './PlayerComponent.css';

const PlayerComponent = (props: any) => {

  const [player, setPlayer] = useState<Player>();
  const [editDescription, setEditDescription] = useState(false);
  const [editPosition, setEditPosition] = useState(false)
  const [editBirthLocation, setEditBirthLocation] = useState(false);

  const [showSaveBtn, setShowSaveBtn] = useState(false);

  const [newDescription, setNewDescription] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newBirthLocation, setNewBirthLocation] = useState('');

  const getTeam = async () => {
    const idPlayer = props.match.params.idPlayer;
    const player = await SportsSrv.getPlayerDetails(idPlayer);
    setPlayer(player);
  }

  const onClickEditPosition = () => setEditPosition(true);

  const onClickEditBirthLocation = () => setEditBirthLocation(true);

  const onClickEditDescription = () => setEditDescription(true);

  const onClickSaveEditPosition = () => {
    setEditPosition(false)
    setPlayer({
      ...player!,
      strPosition: newPosition,
    });
  };

  const onClickSaveEditBirthLocation = () => {
    setEditBirthLocation(false);
    setPlayer({
      ...player!,
      strBirthLocation: newBirthLocation,
    });

  };

  const onClickSaveEditDescription = () => {
    setEditDescription(false)
    setPlayer({
      ...player!,
      strDescriptionEN: newDescription,
    });
  };

  const onChangePosition = (e: ChangeEvent<HTMLInputElement>) => setNewPosition(e.target.value);

  const onChangeBirthLocation = (e: ChangeEvent<HTMLInputElement>) => setNewBirthLocation(e.target.value);

  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => setNewDescription(e.target.value);

  const goBack = () => props.history.goBack();

  const onClickCancelEditPosition = () => {
    setEditPosition(false);
    setNewPosition('');
  }

  const onClickCancelEditDescription = () => {
    setEditDescription(false);
    setNewDescription('');
  }

  const onClickCancelEditBirthLocation = () => {
    setEditBirthLocation(false);
    setNewBirthLocation('');
  }

  const onClickSaveChanges = async () => {
    const body = {
      strCutout: player!.strCutout,
      idPlayer: parseInt(props.match.params.idPlayer),
      strPlayer: player!.strPlayer,
      strPosition: newPosition || player!.strPosition,
      strDescriptionEN: newDescription || player!.strDescriptionEN,
      strBirthLocation: newBirthLocation || player!.strBirthLocation,
    };

    const updatedPlayer = await SportsSrv.editPlayer(body);
    if (updatedPlayer) {
      setPlayer(updatedPlayer);
      onClickCancelEditPosition();
      onClickCancelEditBirthLocation();
      onClickCancelEditDescription();
    }
  }

  useEffect(() => {
    getTeam();
  }, [])

  return (
    <div className="player-details-component">
      <button className="btn btn-secondary fm-df fm-aliic fm-abs fm-ml-2" onClick={goBack}>
        <i className="fa fa-arrow-left fm-mr-2"></i>
        Go Back
      </button>
      <div className="player-details-container col-md-6 offset-3 fm-df fm-alist fm-fldc fm-p-3 fm-my-4">
        <small className="edit-disclamer fm-df fm-w100 fm-jucend"><i>* Click on anything below the name to edit</i></small>
        <div className="player-details fm-df fm-aliic fm-fldc">
          <div className="player-badge fm-df fm-global-center m-auto">
            <img src={player?.strCutout} alt="player badge" className="fm-maw50" />
          </div>
          <div className="player-info fm-w100">
            <h1 className="text-center fm-my-2">{player?.strPlayer}</h1>
            <h5 className="fm-df fm-aliic fm-jucb fm-mb-3">
              {editPosition ? (
                <div>
                  <input type="text" name="position" id="position" className="fm-mr-1" onChange={onChangePosition} />
                  <i className="fa fa-times fm-mr-1" onClick={onClickCancelEditPosition}></i>
                  <i className="fa fa-check" onClick={onClickSaveEditPosition}></i>
                </div>

              ) : (
                <span onClick={onClickEditPosition}>
                  Position: {player?.strPosition}
                </span>
              )}

              {editBirthLocation ? (
                <div>
                  <input type="text" name="birth-location" id="birth-location" className="fm-mr-1" onChange={onChangeBirthLocation} />
                  <i className="fa fa-times fm-mr-1" onClick={onClickCancelEditBirthLocation}></i>
                  <i className="fa fa-check" onClick={onClickSaveEditBirthLocation}></i>
                </div>

              ) : (
                <span onClick={onClickEditBirthLocation}>
                  {player?.strBirthLocation}
                </span>
              )}
            </h5>
            {editDescription ? (
              <div>
                <div className="fm-df fm-aliic fm-jucend fm-mb-2">
                  <i className="fa fa-times fm-mr-1" onClick={onClickCancelEditDescription}></i>
                  <i className="fa fa-check" onClick={onClickSaveEditDescription}></i>
                </div>
                <input type="text" name="description" id="description" className="fm-mr-1" onChange={onChangeDescription} />
              </div>

            ) : (
              <p className="text-justify" onClick={onClickEditDescription}>
                {player?.strDescriptionEN}
              </p>
            )}
          </div>
        </div>
        {(newBirthLocation || newDescription || newPosition) ? (
          <button className="btn btn-success fm-m-auto fm-mt-3" onClick={onClickSaveChanges}>Save changes</button>
        ) : (
          <>
          </>
        )}
      </div>
    </div>
  );
}

export default PlayerComponent;
