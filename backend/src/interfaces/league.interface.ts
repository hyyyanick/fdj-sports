import { Team } from "./team.interface";

export interface League {
  id: number;
  name: string;
  sport: string;
  teams?: Team[];
}
