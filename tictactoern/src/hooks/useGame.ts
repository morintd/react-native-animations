import { useCallback, useEffect, useMemo, useState } from 'react';
import { GameNotificationAction, GameState, GameStatus, INITIAL_GAME, PlayerAction } from '../models';

export function useGame() {
  const [status, setStatus] = useState<'connecting' | 'lobby' | 'game'>('connecting');

  const [game, setGame] = useState<GameState>(INITIAL_GAME);

  const [player, setPlayer] = useState<'X' | 'O'>('X');

  const [ws, setWs] = useState(() => {
    return new WebSocket('ws://localhost:8080/ws');
  });

  useEffect(() => {
    ws.onopen = () => {
      setStatus('lobby');
    };

    ws.onmessage = (e) => {
      console.log('on Message', e.data);

      try {
        const action = JSON.parse(e.data) as GameNotificationAction;

        if (action.type === 'PLAYER_MOVED') {
          setGame(action.payload);
        }

        if (action.type === 'PLAYER_SENT_TO_LOBBY') {
          setStatus('lobby');
          setGame(INITIAL_GAME);
        }

        if (action.type === 'GAME_START') {
          setStatus('game');
          setPlayer(action.payload.player);
        }

        if (action.type === 'ERROR') {
          console.error(action);
        }
      } catch (err) {
        console.error(err);
      }
    };

    ws.onerror = (e) => {
      console.error(e);
    };

    return () => ws.close();
  }, [setGame, setStatus, ws]);

  useEffect(() => {
    ws.onclose = () => {
      setStatus('connecting');
      setGame(INITIAL_GAME);

      setTimeout(() => {
        setWs(new WebSocket('ws://localhost:8080/ws'));
      }, 2000);
    };
  }, [ws, setWs]);

  const send = useCallback(
    (action: PlayerAction) => {
      ws.send(JSON.stringify(action));
    },
    [ws],
  );

  const canPlay = useMemo(() => {
    return status === 'game' && game.next === player && game.winner === '';
  }, [status, game.next, game.winner, player]);

  const onSquarePress = useCallback(
    (index: number) => {
      if (status === 'lobby') return;

      send({
        type: 'PLAYER_MOVE',
        payload: {
          square: index,
        },
      });
    },
    [status, send],
  );

  const onReady = useCallback(() => {
    setStatus('lobby');
    setGame(INITIAL_GAME);

    send({
      type: 'PLAYER_READY',
      payload: {},
    });
  }, [send]);

  const gameStatus: GameStatus = useMemo(() => {
    if (status === 'connecting') return 'connecting';
    if (status === 'lobby') return 'lobby';
    if (canPlay) return 'game';
    if (status === 'game' && !canPlay && !game.winner) return 'waiting';
    if (status === 'game' && game.winner === 'draw') return 'draw';
    if (status === 'game' && player === game.winner) return 'win';

    return 'loss';
  }, [canPlay, game.winner, player, status]);

  return { onSquarePress, game, player, canPlay, status: gameStatus, onReady };
}
