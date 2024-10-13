import React, { useEffect, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import ForecastSheetBackground from "./ForecastSheetBackground";
import { useApplicationDimensions } from "../../hooks";
import { ForecastControl } from "./elements/ForecastControl";
import { Separator } from "./elements/Separator";
import { hourly, weekly } from "../../data/ForecastData";
import { ForecastScroll } from "../forecast/ForecastScroll";
import { ForecastType } from "../../models/Weather";
import { View } from "react-native";
import AirQualityWidget from "../widgets/AirQualityWidget";
import UvIndexWidget from "../widgets/UvIndexWidget";
import WindWidget from "../widgets/WindWidget";
import SunriseWidget from "../widgets/SunriseWidget";
import RainFallWidget from "../widgets/RainFallWidget";
import FeelsLikeWidget from "../widgets/FeelsLikeWidget";
import HumidityWidget from "../widgets/HumidityWidget";
import VisibilityWidget from "../widgets/VisibilityWidget";
import PressureWidget from "../widgets/PressureWidget";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useForecastSheetPosition } from "../../contexts/ForecastSheetContext";

export function ForecastSheet() {
  const { width, height } = useApplicationDimensions();
  const [selectedForecast, setSelectedForecast] = useState<ForecastType>(
    ForecastType.Hourly
  );

  const smallWidgetSize = width / 2 - 20;

  const snapPoints = ["38.5%", "83%"];
  const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100);
  const secondSnapPoint = height * (parseFloat(snapPoints[1]) / 100);

  const minY = height - secondSnapPoint;
  const maxY = height - firstSnapPoint;

  const bottomSheetPosition = useSharedValue(0);
  const currentPosition = useForecastSheetPosition();

  const translateXHourly = useSharedValue(0);
  const translateXWeekly = useSharedValue(width);

  const hourlyStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXHourly.value }],
    };
  });

  const weeklyStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXWeekly.value }],
    };
  });

  useEffect(() => {
    if (selectedForecast === ForecastType.Weekly) {
      translateXHourly.value = withTiming(-width);
      translateXWeekly.value = withTiming(-width);
    } else {
      translateXHourly.value = withTiming(0);
      translateXWeekly.value = withTiming(width);
    }
  }, [selectedForecast]);

  useAnimatedReaction(
    () => bottomSheetPosition.value,
    (bspv) => {
      currentPosition.value = ((bspv - maxY) / (maxY - minY)) * -1;
    }
  );

  return (
    <BottomSheet
      animatedPosition={bottomSheetPosition}
      animateOnMount={false}
      snapPoints={snapPoints}
      handleIndicatorStyle={{
        width: 48,
        height: 5,
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
      backgroundComponent={() => (
        <ForecastSheetBackground
          width={width}
          height={firstSnapPoint}
          cornerRadius={44}
        />
      )}
    >
      <>
        <ForecastControl
          onForecastTypeChange={setSelectedForecast}
          width={width}
        />
        <Separator width={width} height={3} />
        <ScrollView>
          <View
            style={{ flexDirection: "row", overflow: "hidden", width: "100%" }}
          >
            <Animated.View style={hourlyStyle}>
              <ForecastScroll
                capsuleWidth={width * 0.15}
                capsuleHeight={height * 0.17}
                capsuleRadius={30}
                forecasts={hourly}
              />
            </Animated.View>
            <Animated.View style={weeklyStyle}>
              <ForecastScroll
                capsuleWidth={width * 0.15}
                capsuleHeight={height * 0.17}
                capsuleRadius={30}
                forecasts={weekly}
              />
            </Animated.View>
          </View>
          <View
            style={{ flex: 1, paddingTop: 30, paddingBottom: smallWidgetSize }}
          >
            <AirQualityWidget width={width - 30} height={150} />

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                padding: 15,
                gap: 10,
              }}
            >
              <UvIndexWidget width={smallWidgetSize} height={smallWidgetSize} />
              <WindWidget width={smallWidgetSize} height={smallWidgetSize} />
              <SunriseWidget width={smallWidgetSize} height={smallWidgetSize} />
              <RainFallWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <FeelsLikeWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <HumidityWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <VisibilityWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <PressureWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
            </View>
          </View>
        </ScrollView>
      </>
    </BottomSheet>
  );
}
