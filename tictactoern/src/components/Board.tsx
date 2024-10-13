import { StyleSheet, View } from 'react-native';
import { Square } from './Square';
import { useApplicationDimensions } from '../hooks';

type Props = {
  onSquarePress: (index: number) => void;
  board: string[];
  disabled: boolean;
};

export function Board(props: Props) {
  const { onSquarePress, board, disabled } = props;
  const { width } = useApplicationDimensions();

  return (
    <View
      style={[
        styles.board,
        {
          gap: width * 0.035,
          paddingHorizontal: 5,
        },
      ]}
    >
      {Array.from({ length: 3 }).map((_, row) => (
        <View key={row} style={[styles.row, { gap: width * 0.035 }]}>
          {Array.from({ length: 3 }).map((_, square) => (
            <Square
              size={width * 0.27}
              key={square}
              disabled={disabled}
              value={board[square + 3 * row]}
              onPress={() => onSquarePress(square + 3 * row)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
