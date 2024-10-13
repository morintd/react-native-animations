import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useGame } from '../hooks';
import { Board, Status, Button } from '../components';

export function GameScreen() {
  const { game, onSquarePress, player, status, canPlay, onReady } = useGame();

  return (
    <SafeAreaView style={styles.container}>
      <Status canPlay={canPlay} game={game} player={player} status={status} />
      <Board onSquarePress={onSquarePress} board={game.board} disabled={!canPlay} />
      <View style={styles.footer}>{game.winner && <Button onPress={onReady} label="Play Again" />}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
  },
});
