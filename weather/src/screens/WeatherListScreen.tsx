import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { BackgroundGradient } from "../components/BackgroundGradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Canvas,
  LinearGradient,
  RoundedRect,
  Shadow,
  vec,
} from "@shopify/react-native-skia";
import { useApplicationDimensions } from "../hooks";
import { Feather } from "@expo/vector-icons";
import { WeatherWidget } from "../components/WeatherWidget";
import { ForecastList } from "../data/ForecastData";
import { ScrollView } from "react-native-gesture-handler";

export function WeatherListScreen() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { width } = useApplicationDimensions();

  return (
    <>
      <BackgroundGradient />
      <View style={{ paddingTop: top + 2, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingBottom: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable onPress={navigation.goBack}>
              <Ionicons
                name="chevron-back-sharp"
                size={34}
                color="rgba(235,235,245,0.6)"
              />
            </Pressable>
            <Text style={styles.titleText}>Weather</Text>
          </View>
          <Ionicons name="ellipsis-horizontal-circle" size={34} color="white" />
        </View>
        <View style={{ marginHorizontal: 16, borderRadius: 10, height: 36 }}>
          <Canvas style={{ ...StyleSheet.absoluteFillObject }}>
            <RoundedRect x={0} y={0} width={width - 32} height={36} r={10}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(width - 32, 36)}
                colors={["rgba(46,51,90,0.26)", "rgba(28,27,51,0.26)"]}
              />
              <Shadow dx={0} dy={4} blur={4} color="rgba(0,0,0,1)" inner />
            </RoundedRect>
          </Canvas>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 8,
            }}
          >
            <Feather name="search" size={17} color="rgba(235,235,246,0.6)" />
            <TextInput
              placeholder="Search for a city or airport"
              placeholderTextColor="rgba(235,235,246,0.6)"
              style={styles.searchInput}
            />
          </View>
        </View>
        <ScrollView
          style={{ flex: 1, paddingTop: 20 }}
          contentContainerStyle={{
            alignItems: "center",
            gap: 20,
            paddingBottom: 20,
          }}
        >
          {ForecastList.map((forecast) => (
            <WeatherWidget forecast={forecast} key={forecast.location} />
          ))}
          <WeatherWidget forecast={ForecastList[0]} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleText: {
    color: "white",
    fontFamily: "SF-Semibold",
    fontSize: 28,
    verticalAlign: "middle",
  },
  searchInput: {
    color: "rgba(235,235,246,0.5)",
    fontFamily: "SF-Regular",
    fontSize: 17,
    lineHeight: 22,
    paddingLeft: 10,
  },
});
