export interface Team {
  idTeam: number;
  strAlternate: string;
  strStadium: string;
  strTeamBadge: string;
  strDescriptionEN: string;
  strStadiumThumb: string;
  strStadiumDescription: string;
}

export interface Card {
  cardData: Team;
}
