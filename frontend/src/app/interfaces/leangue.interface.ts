import { Team } from './team.interface';

export interface League {
  name: string;
  sport: string;
  teams?: Team[];
}
