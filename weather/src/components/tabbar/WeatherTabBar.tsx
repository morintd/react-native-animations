import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { BottomArc } from "./elements";
import TabBarItems from "./elements/TabBarItems";
import { BlurView } from "expo-blur";
import { useForecastSheetPosition } from "../../contexts/ForecastSheetContext";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export const WeatherTabBar = () => {
  const { height, width } = useWindowDimensions();
  const position = useForecastSheetPosition();

  const tabStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            position.value,
            [0, 1],
            [0, TAB_BAR_HEIGHT + 20],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  }, []);

  return (
    <Animated.View
      style={[
        tabStyles,
        {
          ...StyleSheet.absoluteFillObject,
          top: height - TAB_BAR_HEIGHT,
        },
      ]}
    >
      <BlurView
        style={{
          height: TAB_BAR_HEIGHT,
        }}
        intensity={50}
        tint="dark"
      >
        <BottomArc width={width} height={TAB_BAR_HEIGHT} />
        <TabBarItems />
      </BlurView>
    </Animated.View>
  );
};

const TAB_BAR_HEIGHT = 88;
