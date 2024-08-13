import { Player } from './player.interface';

export interface Team {
  id: number;
  name: string;
  thumbnail: string;
  players: Player[];
}
