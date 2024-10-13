import { StatusBar, useWindowDimensions } from "react-native";

export const useApplicationDimensions = () => {
  const { width, height, scale, fontScale } = useWindowDimensions();

  return {
    width,
    height: height + (StatusBar.currentHeight ?? 0),
    scale,
    fontScale,
  };
};
