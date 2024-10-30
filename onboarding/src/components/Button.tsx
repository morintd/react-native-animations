import {
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../styles";
import { ButtonText } from "./ButtonText";
import { ForwardedRef, forwardRef } from "react";

export const Button = forwardRef(
  (props: TouchableOpacityProps, ref: ForwardedRef<TouchableOpacity>) => {
    const { children, style, ...others } = props;
    return (
      <TouchableOpacity {...others} style={[styles.button, style]}>
        {typeof children === "string" ? (
          <ButtonText>{children}</ButtonText>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderRadius: 20,
    padding: 10,
  },
});
