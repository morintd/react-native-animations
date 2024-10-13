import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HomeBackground } from "../components";
import { WeatherInfo } from "../components/section";
import { ForecastSheet } from "../components/sheet";
import { WeatherTabBar } from "../components/tabbar";
import { currentWeather } from "../data/CurrentWeather";

export function HomeScreen() {
  return (
    <>
      <HomeBackground />
      <WeatherInfo weather={currentWeather} />
      <ForecastSheet />
      <WeatherTabBar />
    </>
  );
}

const styles = StyleSheet.create({});
