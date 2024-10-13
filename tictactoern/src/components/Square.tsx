import { Pressable, StyleSheet } from 'react-native';
import { Canvas, Line, Path, rect, Rect, Skia, vec } from '@shopify/react-native-skia';
import { Colors } from '../theme';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

type Props = {
  value: string;
  onPress: () => void;
  disabled: boolean;
  size: number;
};

export function Square(props: Props) {
  const { value, disabled, size, ...others } = props;

  const scale = useSharedValue(0);

  const squareStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animateX = useSharedValue(0);
  const animateO = useSharedValue(0);

  const vectorsXEndLeft = useDerivedValue(() => {
    const end = 0.35 + interpolate(animateX.value, [0, 0.2, 0.6, 1], [0, 0, 0.3, 0.3]);
    return vec(size * end, size * end);
  });

  const vectorsXEndRight = useDerivedValue(() => {
    const delta = interpolate(animateX.value, [0, 0.6, 1], [0, 0, 0.3]);
    return vec(size * (0.65 - delta), size * (0.35 + delta));
  });

  useEffect(() => {
    if (value) scale.value = withTiming(1, { duration: 200 });
    else {
      scale.value = withTiming(0);
      animateX.value = withTiming(0);
      animateO.value = withTiming(0);
    }

    if (value === 'X') {
      animateX.value = withTiming(1, { duration: 1000 });
    } else if (value === 'O') {
      animateO.value = withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.exp) });
    }
  }, [animateO, animateX, scale, value]);

  const oPath = useDerivedValue(() => {
    const path = Skia.Path.Make();
    path.moveTo(size / 2, size / 2);
    path.addArc(
      { x: size / 2 - size / 4, y: size / 2 - size / 4, width: size / 2, height: size / 2 },
      180,
      interpolate(animateO.value, [0, 1], [0, 360]),
    );

    return path;
  });

  return (
    <Pressable disabled={disabled} {...others} style={{ position: 'relative' }}>
      <Canvas style={{ width: size, height: size }}>
        <Rect rect={rect(0, 0, size, size)} style={disabled && !value ? 'fill' : 'stroke'} color="#F1F1F1" strokeWidth={3} />
      </Canvas>
      <AnimatedCanvas style={[{ width: size, height: size, ...StyleSheet.absoluteFillObject }, squareStyle]}>
        {value !== '' && (
          <>
            <Rect
              rect={rect(0, 0, size, size)}
              style={'fill'}
              color={value === 'X' ? Colors.BackgroundX : Colors.BackgroundO}
              strokeWidth={3}
            />
            <Rect
              rect={rect(0, 0, size, size)}
              style={'stroke'}
              color={value === 'X' ? Colors.X : Colors.O}
              strokeWidth={3}
            />
            {value === 'X' && (
              <>
                <Line
                  p1={vec(size * 0.35, size * 0.35)}
                  p2={vectorsXEndLeft}
                  style="stroke"
                  strokeWidth={5}
                  color={Colors.X}
                />
                <Line
                  p1={vec(size * 0.65, size * 0.35)}
                  p2={vectorsXEndRight}
                  style="stroke"
                  strokeWidth={5}
                  color={Colors.X}
                />
              </>
            )}
            {value === 'O' && <Path path={oPath} color={Colors.O} style={'stroke'} strokeWidth={5} />}
          </>
        )}
      </AnimatedCanvas>
    </Pressable>
  );
}

const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);
