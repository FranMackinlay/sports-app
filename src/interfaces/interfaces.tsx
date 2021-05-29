export interface Player {
  strCutout: string;
  idPlayer: string;
  strPlayer: string;
  strPosition: string;
  strDescriptionEN: string;
  strBirthLocation: string;
}

export interface Team {
  idTeam: number;
  strAlternate: string;
  strStadium: string;
  strTeamBadge: string;
  strDescriptionEN: string;
  strStadiumThumb: string;
  strStadiumDescription: string;
  players: Array<Player>;
}

export interface Card {
  team?: Team;
  player?: Player;
}
