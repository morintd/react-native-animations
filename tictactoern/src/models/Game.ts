export type GameState = {
  board: string[];
  winner: string;
  next: string;
};

export type GameStatus = 'connecting' | 'lobby' | 'game' | 'waiting' | 'draw' | 'win' | 'loss';

export const INITIAL_GAME: GameState = {
  board: ['', '', '', '', '', '', '', '', ''],
  next: 'X',
  winner: '',
};
