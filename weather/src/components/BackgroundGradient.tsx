import { Platform, StyleSheet } from "react-native";
import React from "react";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import {
  interpolateColor,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { useForecastSheetPosition } from "../contexts/ForecastSheetContext";
import { useApplicationDimensions } from "../hooks";

export function BackgroundGradient() {
  const { width, height } = useApplicationDimensions();

  const position = useForecastSheetPosition();

  const leftBackgroundColor = useSharedValue("#2E335A");
  const rightBackgroundColor = useSharedValue("#1C1B33");

  const backgroundColors = useDerivedValue(() => {
    if (Platform.OS === "ios") {
      leftBackgroundColor.value = interpolateColor(
        position.value,
        [0, 1],
        ["#2E335A", "#422E5A"]
      );
    } else {
      leftBackgroundColor.value = position.value > 0.5 ? "#422E5A" : "#2E335A";
    }

    return [leftBackgroundColor.value, rightBackgroundColor.value];
  });

  return (
    <Canvas style={{ flex: 1, ...StyleSheet.absoluteFillObject }}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, height)}
          colors={backgroundColors}
        />
      </Rect>
    </Canvas>
  );
}

const styles = StyleSheet.create({});
