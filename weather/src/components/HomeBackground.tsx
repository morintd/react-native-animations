import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { useApplicationDimensions } from "../hooks/useApplicationDimensions";
import { useForecastSheetPosition } from "../contexts/ForecastSheetContext";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BackgroundGradient } from "./BackgroundGradient";

const HomeBackground = () => {
  const { width, height } = useApplicationDimensions();
  const position = useForecastSheetPosition();

  const imageBackgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            position.value,
            [0, 1],
            [0, -height],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const smokeStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        position.value,
        [0, 0.1],
        [1, 0],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <BackgroundGradient />
      <AnimatedImageBackground
        style={[{ height: "100%" }, imageBackgroundStyle]}
        source={require("../../assets/home/Background.png")}
        resizeMode="cover"
      >
        <AnimatedCanvas
          style={[
            {
              height: Math.ceil(height * 0.6),
              ...StyleSheet.absoluteFillObject,
              top: Math.ceil(height * 0.4),
            },
            smokeStyle,
          ]}
        >
          <Rect x={0} y={0} width={width} height={Math.ceil(height * 0.6)}>
            <LinearGradient
              start={vec(width / 2, 0)}
              end={vec(width / 2, Math.ceil(height * 0.6))}
              colors={["rgba(58,63,84,0)", "rgba(58,63,84,1)"]}
              positions={[-0.02, 0.54]}
            />
          </Rect>
        </AnimatedCanvas>
        <Image
          source={require("../../assets/home/House.png")}
          resizeMode="cover"
          style={{
            width,
            height: width,
            ...StyleSheet.absoluteFillObject,
            top: "36%",
          }}
        />
      </AnimatedImageBackground>
    </View>
  );
};

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);
const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);

export { HomeBackground };
