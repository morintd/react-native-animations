import { View, Text, StyleSheet, LayoutChangeEvent } from "react-native";
import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Canvas, Line, LinearGradient, vec } from "@shopify/react-native-skia";
import { ForecastType } from "../../../models/Weather";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  onForecastTypeChange: (forecaseType: ForecastType) => void;
  width: number;
};

export function ForecastControl(props: Props) {
  const { onForecastTypeChange, width } = props;
  const [textWidth, setTextWidth] = useState(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  }, []);

  const lineTranslateX = useSharedValue(0);

  const onPressForecast = useCallback(
    (type: ForecastType) => {
      if (type === ForecastType.Weekly) {
        lineTranslateX.value = withTiming(width - textWidth - 168, {
          duration: 500,
        });
      } else {
        lineTranslateX.value = withTiming(0, { duration: 500 });
      }
      onForecastTypeChange(type);
    },
    [width]
  );

  const lineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: lineTranslateX.value,
        },
      ],
    };
  });

  return (
    <View style={styles.control}>
      <View style={styles.controls}>
        <TouchableOpacity
          onLayout={onLayout}
          onPress={() => onPressForecast(ForecastType.Hourly)}
        >
          <Text style={styles.forecastText}>Hourly Forecast</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressForecast(ForecastType.Weekly)}>
          <Text style={styles.forecastText}>Weekly Forecast</Text>
        </TouchableOpacity>
      </View>
      <AnimatedCanvas
        style={[
          {
            height: 3,
            width: textWidth,
            marginLeft: 32,
          },
          lineStyle,
        ]}
      >
        <Line p1={vec(0, 0)} p2={vec(textWidth, 0)} strokeWidth={3}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(textWidth, 0)}
            colors={[
              "rgba(147,112,177,0)",
              "rgba(147,112,177, 1)",
              "rgba(147,112,177,0)",
            ]}
          />
        </Line>
      </AnimatedCanvas>
    </View>
  );
}

const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);

const styles = StyleSheet.create({
  forecastText: {
    fontFamily: "SF-Semibold",
    fontSize: 15,
    lineHeight: 20,
    color: "rgba(235,235,245,0.6)",
  },
  control: {
    marginBottom: 5,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
  },
});
