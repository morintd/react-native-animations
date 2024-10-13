import { GameState } from './Game';

export type ErrorNotificationAction = {
  type: 'ERROR';
  payload: {
    error: string;
  };
};

export type GameStartNotificationAction = {
  type: 'GAME_START';
  payload: {
    player: 'X' | 'O';
  };
};

export type PlayerMoveNotificationAction = {
  type: 'PLAYER_MOVED';
  payload: GameState;
};

export type PlayerSentLobbyNotificationAction = {
  type: 'PLAYER_SENT_TO_LOBBY';
  payload: {
    reason: string;
  };
};

export type GameNotificationAction =
  | ErrorNotificationAction
  | GameStartNotificationAction
  | PlayerMoveNotificationAction
  | PlayerSentLobbyNotificationAction;

export type PlayerMoveAction = {
  type: 'PLAYER_MOVE';
  payload: {
    square: number;
  };
};

export type PlayerReadyAction = {
  type: 'PLAYER_READY';
  payload: {};
};
export type PlayerAction = PlayerMoveAction | PlayerReadyAction;
