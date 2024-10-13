import { Canvas, LinearGradient, Path, vec } from "@shopify/react-native-skia";
import { StyleSheet, Text } from "react-native";

type Props = {
  width: number;
  height: number;
};

export const BottomArc = (props: Props) => {
  const { width, height } = props;

  const arc = `M 0 0 Q ${width / 2} ${
    height / 2
  } ${width} 0 L ${width} ${height} L 0 ${height} Z`;

  const border = `M 0 0 Q ${width / 2} ${height / 2} ${width} 0`;

  return (
    <Canvas style={{ height, width, ...StyleSheet.absoluteFillObject }}>
      <Path path={arc}>
        <LinearGradient
          start={vec(width / 2, 0)}
          end={vec(width / 2, height)}
          colors={["rgba(58,58,106,1)", "rgba(37,36,76,01)"]}
        />
      </Path>
      <Path
        path={border}
        style="stroke"
        strokeWidth={0.5}
        color="rgba(117,130,244,0.5)"
      />
    </Canvas>
  );
};
