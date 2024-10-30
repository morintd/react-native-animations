import { ReactNode, useCallback } from "react";
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useApplicationDimensions } from "../../hooks";

import { OnboardingImage } from "./OnboardingImage";
import { OnboardingText } from "./OnboardingText";
import { OnboardingFooter } from "./OnboardingFooter";
import { Colors } from "../../styles";

type Props = {
  pages: Array<{ id: string; image: ImageSourcePropType; text: ReactNode }>;
  ignore: string;
  start: string;
  next: string;
  done: string;
  onDone: () => void;
};

export function Onboarding(props: Props) {
  const { pages, ignore, start, next, done, onDone } = props;
  const { width } = useApplicationDimensions();
  const { top } = useSafeAreaInsets();

  const currentStep = useSharedValue(0);

  const onNext = useCallback(() => {
    currentStep.value = withTiming(Math.round(currentStep.value) + 1);
  }, [currentStep]);

  const onPrevious = useCallback(() => {
    currentStep.value = withTiming(Math.round(currentStep.value) - 1);
  }, [currentStep]);

  const headerStyle = useAnimatedStyle(() => ({
    height: interpolate(
      currentStep.value,
      [0, 1],
      [0, 50],
      Extrapolation.CLAMP
    ),
  }));

  const previousStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: -interpolate(
          currentStep.value,
          [0, 1],
          [top + 24, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[headerStyle, styles.header]}>
        <AnimatedTouchableOpacity onPress={onPrevious} style={previousStyle}>
          <Ionicons name="arrow-back" size={24} color={Colors.Primary} />
        </AnimatedTouchableOpacity>
        <AnimatedTouchableOpacity style={previousStyle} onPress={onDone}>
          <Text style={styles.ignore}>{ignore}</Text>
        </AnimatedTouchableOpacity>
      </Animated.View>
      <View style={[styles.content, { flex: 1 }]}>
        <View style={styles.imageContainer}>
          {pages.map((page, index) => (
            <OnboardingImage
              key={page.id}
              currentPage={currentStep}
              height={width * 0.65}
              page={index}
              source={page.image}
              width={width - 40}
            />
          ))}
        </View>
        <View style={styles.textContainer}>
          {pages.map((page, index) => (
            <OnboardingText
              key={page.id}
              currentPage={currentStep}
              page={index}
              text={page.text}
            />
          ))}
        </View>
        <OnboardingFooter
          width={width}
          page={currentStep}
          pages={pages.length}
          start={start}
          next={next}
          done={done}
          onNext={onNext}
          onDone={onDone}
        />
      </View>
    </View>
  );
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1.2,
    position: "relative",
  },
  textContainer: {
    position: "relative",
  },
  ignore: {
    color: Colors.Primary,
  },
});
