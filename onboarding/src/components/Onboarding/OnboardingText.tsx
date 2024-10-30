import { ReactNode } from 'react';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type OnboardingTextProps = {
  currentPage: SharedValue<number>;
  page: number;
  text: ReactNode;
};

export function OnboardingText(props: OnboardingTextProps) {
  const { currentPage, page, text } = props;

  const textStyle = useAnimatedStyle(() => ({
    display: Math.abs(currentPage.value - page) < 1 ? 'flex' : 'none',
    opacity: interpolate(Math.abs(currentPage.value - page), [0, 1], [1, 0], Extrapolation.CLAMP),
    position: currentPage.value > page ? 'absolute' : 'relative',
  }));

  return <Animated.View style={textStyle}>{text}</Animated.View>;
}
