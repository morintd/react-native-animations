import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Weather } from "../../models/Weather";
import { DEGREE_SYMBOL } from "../../utils/Constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useForecastSheetPosition } from "../../contexts/ForecastSheetContext";

type Props = {
  weather: Weather;
};

export function WeatherInfo(props: Props) {
  const {
    weather: { city, condition, high, low, temperature },
  } = props;

  const { top } = useSafeAreaInsets();
  const position = useForecastSheetPosition();

  const temperatureStyle = useAnimatedStyle(() => {
    const fontFamily = position.value >= 0.5 ? "SF-Semibold" : "SF-Thin";

    return {
      fontFamily,
      fontSize: interpolate(position.value, [0, 1], [96, 20]),
      lineHeight: interpolate(position.value, [0, 1], [96, 20]),
      color: interpolateColor(
        position.value,
        [0, 1],
        ["white", "rgba(235,235,235,0.6)"]
      ),
      opacity: interpolate(position.value, [0, 0.5, 1], [1, 0, 1]),
    };
  });

  const minMaxStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(position.value, [0, 0.5], [1, 0]),
    };
  });

  const separatorStyle = useAnimatedStyle(() => {
    const display = position.value > 0.5 ? "flex" : "none";
    return {
      display,
      opacity: interpolate(position.value, [0, 0.5, 1], [0, 0, 1]),
    };
  });

  const temperatureConditionStyle = useAnimatedStyle(() => {
    const flexDirection = position.value > 0.5 ? "row" : "column";
    return { flexDirection };
  });

  const conditionStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(position.value, [0, 0.5, 1], [1, 0, 1]),
      transform: [
        { translateY: interpolate(position.value, [0, 0.5, 1], [0, -20, 0]) },
      ],
    };
  });

  const viewStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            position.value,
            [0, 1],
            [0, -51],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[viewStyles, { marginTop: top + 51, alignItems: "center" }]}
    >
      <Animated.Text style={styles.cityText}>{city}</Animated.Text>

      <Animated.View
        style={[{ alignItems: "center" }, temperatureConditionStyle]}
      >
        <Animated.View style={[{ flexDirection: "row" }]}>
          <Animated.Text style={[styles.temperatureText, temperatureStyle]}>
            {temperature}
            {DEGREE_SYMBOL}
          </Animated.Text>
          <Animated.Text
            style={[styles.separator, temperatureStyle, separatorStyle]}
          >
            |
          </Animated.Text>
        </Animated.View>
        <Animated.Text style={[styles.conditionText, conditionStyle]}>
          {condition}
        </Animated.Text>
      </Animated.View>

      <Animated.Text style={[styles.minMaxText, minMaxStyle]}>
        H: {high}
        {DEGREE_SYMBOL} L: {low}
        {DEGREE_SYMBOL}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cityText: {
    fontFamily: "SF-Regular",
    color: "white",
    fontSize: 34,
  },
  temperatureText: {
    fontFamily: "SF-Thin",
    fontSize: 96,
    color: "white",
    lineHeight: 96,
  },
  conditionText: {
    fontFamily: "SF-Semibold",
    fontSize: 20,
    color: "rgba(235,235,245,0.6)",
    lineHeight: 20,
  },
  minMaxText: {
    fontFamily: "SF-Semibold",
    fontSize: 20,
    color: "white",
    lineHeight: 20,
  },
  separator: {
    fontFamily: "SF-Thin",
    fontSize: 96,
    color: "white",
    lineHeight: 96,
    marginHorizontal: 2,
    display: "none",
  },
});
