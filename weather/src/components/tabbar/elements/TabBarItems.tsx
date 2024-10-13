import { View, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { ListIcon, MapIcon } from "../icons";
import { TrapezoidBackground } from "./TrapezoidBackground";
import { useApplicationDimensions } from "../../../hooks";
import { CircleButton } from "./CircleButton";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export default function TabBarItems() {
  const { width, height } = useApplicationDimensions();

  const buttonRadius = (height * 0.51 * 0.12) / 2;
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 32,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <MapIcon />
      <TrapezoidBackground width={width * 0.68} height={height * 0.12} />
      <Pressable
        style={{
          ...StyleSheet.absoluteFillObject,
          left: width / 2 - buttonRadius,
          top: 12,
          width: buttonRadius * 2,
          height: buttonRadius * 2,
        }}
      >
        {({ pressed }) => (
          <CircleButton pressed={pressed} radius={buttonRadius} />
        )}
      </Pressable>
      <Pressable onPress={() => navigation.navigate("list")}>
        <ListIcon />
      </Pressable>
    </View>
  );
}
