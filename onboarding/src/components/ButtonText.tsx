import { StyleSheet, Text, TextProps } from "react-native";
import { Colors } from "../styles";
import { ForwardedRef, forwardRef } from "react";

export const ButtonText = forwardRef(
  (props: TextProps, ref: ForwardedRef<Text>) => {
    return (
      <Text {...props} ref={ref} style={[styles.buttonText, props.style]} />
    );
  }
);

const styles = StyleSheet.create({
  buttonText: {
    color: Colors.White,
    fontWeight: 600,
  },
});
