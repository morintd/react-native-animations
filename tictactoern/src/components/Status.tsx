import { StyleSheet, Text, View } from 'react-native';
import { GameState, GameStatus } from '../models';
import { Colors } from '../theme';
import Animated, { interpolate, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  status: GameStatus;
  game: GameState;
  player: 'X' | 'O';
  canPlay: boolean;
};

export function Status(props: Props) {
  const { status } = props;
  const prevStatus = useRef(status);

  const connecting = useSharedValue(0);
  const lobby = useSharedValue(1);
  const game = useSharedValue(1);
  const waiting = useSharedValue(1);
  const draw = useSharedValue(1);
  const win = useSharedValue(1);
  const loss = useSharedValue(1);

  const connectingStyle = useAnimatedStatusStyle(connecting);
  const lobbyStyle = useAnimatedStatusStyle(lobby);
  const playingStyle = useAnimatedStatusStyle(game);
  const waitingStyle = useAnimatedStatusStyle(waiting);
  const drawStyle = useAnimatedStatusStyle(draw);
  const winStyle = useAnimatedStatusStyle(win);
  const lossStyle = useAnimatedStatusStyle(loss);

  const animateStatus = useDebouncedCallback(
    () => {
      const animations: Record<GameStatus, SharedValue<number>> = {
        connecting,
        lobby,
        game,
        waiting,
        draw,
        win,
        loss,
      };

      const prevAnimation = animations[prevStatus.current];
      const currentAnimation = animations[status];

      prevAnimation.value = withTiming(-1, { duration: 500 }, () => {
        prevAnimation.value = 1;
      });
      currentAnimation.value = withTiming(0, { duration: 500 });

      prevStatus.current = status;
    },
    500,
    { leading: true },
  );

  useEffect(() => {
    if (status !== prevStatus.current) {
      animateStatus();
    }
  }, [animateStatus, status]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Animated.Text style={[styles.textInfo, styles.textContainer, connectingStyle]}>
        Connecting to the game...
      </Animated.Text>
      <Animated.Text style={[styles.textInfo, styles.textContainer, lobbyStyle]}>Looking for another player</Animated.Text>
      <Animated.Text style={[styles.textInfo, styles.textContainer, playingStyle]}>Your turn</Animated.Text>
      <Animated.Text style={[styles.textInfo, styles.textContainer, waitingStyle]}>Please wait for your turn</Animated.Text>
      <Animated.View style={[styles.textContainer, styles.texts, drawStyle]}>
        <Text style={styles.textDraw}>DRAW!</Text>
        <Text style={styles.subtitle}>It's a draw</Text>
      </Animated.View>
      <Animated.View style={[styles.textContainer, styles.texts, winStyle]}>
        <Text style={styles.textWin}>You won!</Text>
        <Text style={styles.subtitle}>Congratulations</Text>
      </Animated.View>
      <Animated.View style={[styles.textContainer, styles.texts, lossStyle]}>
        <Text style={styles.textLoss}>You lost!</Text>
        <Text style={styles.subtitle}>Good luck next time</Text>
      </Animated.View>
    </View>
  );
}

const useAnimatedStatusStyle = (animation: SharedValue<number>) => {
  return useAnimatedStyle(() => {
    return {
      opacity: interpolate(animation.value, [-1, 0, 1], [0, 1, 0]),
      transform: [{ translateY: 50 * animation.value }],
    };
  });
};

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
  },
  texts: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfo: {
    fontSize: 24,
  },
  textDraw: {
    fontSize: 24,
  },
  textWin: {
    color: Colors.X,
    fontSize: 24,
  },
  textLoss: {
    color: Colors.O,
    fontSize: 24,
  },
  subtitle: {
    fontSize: 18,
    color: '#ADADAD',
  },
});
