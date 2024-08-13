export interface Player {
  id: number;
  name: string;
  position: string;
  thumbnail: string;
  born: Date;
  signin: PlayerSigninAmount;
}

interface PlayerSigninAmount {
  amount: number;
  currency: Curreny;
}

type Curreny = 'eur' | 'gpp';
