import { useCallback } from "react";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import OnboardingProgress from "./OnboardingProgress";
import { Button } from "../Button";
import { ButtonText } from "../ButtonText";

type Props = {
  width: number;

  page: SharedValue<number>;
  pages: number;

  onNext: () => void;
  onDone: () => void;

  start: string;
  next: string;
  done: string;
};

export function OnboardingFooter(props: Props) {
  const { width, page, pages, start, next, onNext, onDone, done } = props;

  const progressStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: -interpolate(
          page.value,
          [0, 1],
          [width * 0.35, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
    opacity: interpolate(
      page.value,
      [0, 0.2, 1],
      [0, 0, width * 0.35],
      Extrapolation.CLAMP
    ),
  }));

  const progress = useDerivedValue(() => {
    const progressWidth = width * 0.35;
    const progressPercent = page.value / (pages - 1);

    return progressPercent * progressWidth;
  });

  const buttonStyle = useAnimatedStyle(() => ({
    width: `${interpolate(
      page.value,
      [0, 1],
      [100, 35],
      Extrapolation.CLAMP
    )}%`,
  }));

  const startStyle = useAnimatedStyle(() => ({
    display: page.value > 0.5 || page.value > pages - 1.5 ? "none" : "flex",
  }));

  const nextStyle = useAnimatedStyle(() => ({
    display: page.value <= 0.5 || page.value > pages - 1.5 ? "none" : "flex",
  }));

  const endStyle = useAnimatedStyle(() => ({
    display: pages > 1 && page.value <= pages - 1.5 ? "none" : "flex",
  }));

  const onPress = useCallback(() => {
    if (page.value === pages - 1) {
      onDone();
    } else {
      onNext();
    }
  }, [onDone, onNext, page.value, pages]);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      <View>
        <OnboardingProgress
          style={progressStyle}
          width={width * 0.35}
          height={10}
          value={progress}
        />
      </View>
      <AnimatedButton style={buttonStyle} onPress={onPress}>
        <AnimatedButtonText style={startStyle}>{start}</AnimatedButtonText>
        <AnimatedButtonText style={nextStyle}>{next}</AnimatedButtonText>
        <AnimatedButtonText style={endStyle}>{done}</AnimatedButtonText>
      </AnimatedButton>
    </View>
  );
}

const AnimatedButton = Animated.createAnimatedComponent(Button);
const AnimatedButtonText = Animated.createAnimatedComponent(ButtonText);
