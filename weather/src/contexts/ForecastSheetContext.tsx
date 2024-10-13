import { createContext, ReactNode, useContext } from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";

export const ForecastSheetContext = createContext<SharedValue<number> | null>(
  null
);

type Props = {
  children: ReactNode;
};

export const ForecastSheetProvider = ({ children }: Props) => {
  const position = useSharedValue(0);

  return (
    <ForecastSheetContext.Provider value={position}>
      {children}
    </ForecastSheetContext.Provider>
  );
};

export const useForecastSheetPosition = () => {
  const position = useContext(ForecastSheetContext);

  if (!position) {
    throw new Error(
      "useForecastSheetPosition should be used in a ForecastSheetProvider"
    );
  }

  return position;
};
