import { ImageSourcePropType, StyleSheet } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type OnboardingImageProps = {
  currentPage: SharedValue<number>;
  page: number;
  width: number;
  height: number;
  source: ImageSourcePropType;
};

export function OnboardingImage(props: OnboardingImageProps) {
  const { currentPage, page, width, height, source } = props;

  const imageStyle = useAnimatedStyle(() => ({ transform: [{ translateX: (page - currentPage.value) * (width + 40) }] }));

  return <Animated.Image style={[styles.image, imageStyle, { width, height }]} source={source} />;
}

const styles = StyleSheet.create({
  image: {
    objectFit: 'contain',
    position: 'absolute',
  },
});
