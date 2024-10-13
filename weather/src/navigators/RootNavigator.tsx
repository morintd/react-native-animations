import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { WeatherListScreen } from "../screens/WeatherListScreen";
import { ForecastSheetProvider } from "../contexts/ForecastSheetContext";

const Stack = createStackNavigator();

export function RootNavigator() {
  return (
    <ForecastSheetProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="list" component={WeatherListScreen} />
      </Stack.Navigator>
    </ForecastSheetProvider>
  );
}
