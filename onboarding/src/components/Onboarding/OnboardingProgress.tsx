import React from "react";
import Animated, { SharedValue } from "react-native-reanimated";
import { Canvas, RoundedRect } from "@shopify/react-native-skia";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Colors } from "../../styles";

type Props = {
  width: number;
  height: number;
  style: StyleProp<ViewStyle>;

  value: SharedValue<number>;
};

export default function OnboardingProgress(props: Props) {
  const { width, height, value, style } = props;

  return (
    <Animated.View style={[style, styles.container]}>
      <Canvas style={{ width, height }}>
        <RoundedRect
          x={0}
          y={0}
          width={width}
          height={height}
          r={20}
          color={Colors.Secondary}
        />
        <RoundedRect
          x={0}
          y={0}
          width={value}
          height={height}
          r={20}
          color={Colors.Primary}
        />
      </Canvas>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});
