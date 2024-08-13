import { Team } from './team.interface';

export interface League {
  _id: any;
  name: string;
  sport: string;
  teams?: Team[];
}
