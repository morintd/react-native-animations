import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Forecast } from "../../models/Weather";
import { ScrollView } from "react-native-gesture-handler";
import { ForecastCapsule } from "./ForecastCapsule";

type Props = {
  forecasts: Forecast[];
  capsuleWidth: number;
  capsuleHeight: number;
  capsuleRadius: number;
};

export function ForecastScroll(props: Props) {
  const { forecasts, capsuleWidth, capsuleHeight, capsuleRadius } = props;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ paddingTop: 20, paddingBottom: 10 }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 12,
          paddingHorizontal: 20,
        }}
      >
        {forecasts.map((forecast) => (
          <ForecastCapsule
            key={forecast.date.toISOString()}
            forecast={forecast}
            height={capsuleHeight}
            width={capsuleWidth}
            radius={capsuleRadius}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
