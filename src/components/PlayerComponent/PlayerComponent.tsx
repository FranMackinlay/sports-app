import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Player } from '../../interfaces/interfaces';
import SportsSrv from '../../services/SportsSrv';
import './PlayerComponent.css';

const PlayerComponent = (props: any) => {

  const [player, setPlayer] = useState<Player>();
  const [isNewPlayer, setIsNewPlayer] = useState(false);
  const [newName, setNewName] = useState('');
  const [newImage, setNewImage] = useState('');
  const [editDescription, setEditDescription] = useState(false);
  const [editPosition, setEditPosition] = useState(false)
  const [editBirthLocation, setEditBirthLocation] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newBirthLocation, setNewBirthLocation] = useState('');

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

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setNewName(e.target.value);

  const onChangeBirthLocation = (e: ChangeEvent<HTMLInputElement>) => setNewBirthLocation(e.target.value);

  const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => setNewDescription(e.target.value);

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => setNewImage(e.target.value);

  const goBack = () => props.history.push(`/team/${localStorage.getItem('team')}`);

  const onClickDeletePlayer = async () => {
    const isDeleteSuccess = await SportsSrv.removePlayerFromTeam(props.match.params.idPlayer)

    if (isDeleteSuccess) {
      goBack();
    } else {
      alert('Oh no, we couldn\'t delete the player, try again later!');
    }
  };

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

  const onClickSaveChanges = async (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (isNewPlayer) {
      if (!newName || !newImage || !newDescription || !newPosition || !newBirthLocation) {
        return alert('Please complete the player information before saving');
      }
    }
    const body = {
      strCutout: newImage || player!.strCutout,
      idPlayer: parseInt(props.match.params.idPlayer) || 0,
      strPlayer: newName || player!.strPlayer,
      strPosition: newPosition || player!.strPosition,
      strDescriptionEN: newDescription || player!.strDescriptionEN,
      strBirthLocation: newBirthLocation || player!.strBirthLocation,
    };

    const updatedPlayer = await SportsSrv.editPlayer(body, isNewPlayer);

    if (updatedPlayer) {
      if (isNewPlayer) {
        props.history.push(`/player/${updatedPlayer.idPlayer}`);
        window.location.reload();
      } else {
        setPlayer(updatedPlayer);
        onClickCancelEditPosition();
        onClickCancelEditBirthLocation();
        onClickCancelEditDescription();
      }
    }
  }

  useEffect(() => {
    if (props.match.params.idPlayer === 'new') {
      onClickEditPosition();
      onClickEditBirthLocation();
      onClickEditDescription();
      setIsNewPlayer(true);
    } else {
      const getTeam = async () => {
        const idPlayer = props.match.params.idPlayer;
        const player = await SportsSrv.getPlayerDetails(idPlayer);
        setPlayer(player);
      }
      getTeam();
    }
  }, [props.match.params.idPlayer]);

  return (
    <div className="player-details-component">
      <form onSubmit={onClickSaveChanges}>
      <button className="btn btn-secondary fm-df fm-aliic fm-abs fm-ml-2" onClick={goBack}>
        <i className="fa fa-arrow-left fm-mr-2"></i>
        Go Back
      </button>
        {!isNewPlayer && (
          <button className="btn btn-danger fm-df fm-aliic fm-abs fm-ml-2 delete-player" onClick={onClickDeletePlayer}>
            Delete player
          </button>
        )}
      <div className="player-details-container col-md-6 offset-3 fm-df fm-alist fm-fldc fm-p-3 fm-my-4">
        <small className="edit-disclamer fm-df fm-w100 fm-jucend"><i>* Click on anything below the name to edit</i></small>
        <div className="player-details fm-df fm-aliic fm-fldc">
          <div className="player-badge fm-df fm-global-center m-auto">
              {isNewPlayer ? (
                <div className="text-center">
                  <label htmlFor="file" className="fm-mr-2">Upload image</label>
                  <input type="url" onChange={onChangeImage} name="file" id="file" required />
                </div>
              ) : (
                  <img src={player?.strCutout} alt="player badge" className="fm-maw50" />
              )}
          </div>
            <div className={`player-info fm-w100 ${isNewPlayer ? 'text-center' : ''}`}>
              {isNewPlayer ? (
                <div>
                  <input type="text" name="Name" placeholder="Name" id="name" className="text-center fm-my-4 fm-mr-1" onChange={onChangeName} required />
                </div>
              ) : (
                <h1 className="text-center fm-my-2">{player?.strPlayer}</h1>
              )}
            <h5 className="fm-df fm-aliic fm-jucb fm-mb-3">
              {editPosition ? (
                <div>
                    <input type="text" name="position" placeholder="Position" id="position" className="fm-mr-1" onChange={onChangePosition} required />
                    <div className={`${isNewPlayer ? 'd-none' : ''}`}>
                      <i className="fa fa-times fm-mr-1" onClick={onClickCancelEditPosition}></i>
                      <i className="fa fa-check" onClick={onClickSaveEditPosition}></i>
                    </div>
                  </div>

              ) : (
                <span onClick={onClickEditPosition}>
                  Position: {player?.strPosition}
                </span>
              )}

              {editBirthLocation ? (
                <div>
                    <input type="text" name="birth-location" placeholder="Birth location" id="birth-location" className="fm-mr-1" onChange={onChangeBirthLocation} required />
                    <div className={`${isNewPlayer ? 'd-none' : ''}`}>
                      <i className="fa fa-times fm-mr-1" onClick={onClickCancelEditBirthLocation}></i>
                      <i className="fa fa-check" onClick={onClickSaveEditBirthLocation}></i>
                    </div>
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
                    <div className={`${isNewPlayer ? 'd-none' : ''}`}>
                      <i className="fa fa-times fm-mr-1" onClick={onClickCancelEditDescription}></i>
                      <i className="fa fa-check" onClick={onClickSaveEditDescription}></i>
                    </div>
                  </div>
                  <textarea name="description" placeholder="Description" id="description" className="fm-mr-1" onChange={onChangeDescription} required />
              </div>

            ) : (
              <p className="text-justify" onClick={onClickEditDescription}>
                {player?.strDescriptionEN}
              </p>
            )}
          </div>
        </div>
          {(newBirthLocation || newDescription || newPosition || isNewPlayer) ? (
            <button type="submit" className="btn btn-success fm-m-auto fm-mt-3">Save changes</button>
        ) : (
          <>
          </>
        )}
      </div>
      </form>
    </div>
  );
}

export default PlayerComponent;
