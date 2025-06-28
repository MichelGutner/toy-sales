import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TextInput, useColorScheme, View } from "react-native";
import { TTextInputWithIconsProps } from "./types";

export const TextInputWithIcons = ({
  leadingIcon,
  trailingIcon,
  ...props
}: TTextInputWithIconsProps) => {
    const colorScheme = useColorScheme();
    const color = Colors[colorScheme ?? "light"];

  return (
    <View style={[style.container, props.containerStyle]}>
      {leadingIcon && leadingIcon}
      <TextInput {...props} style={{ flex: 1, color: color.text }} />
      {trailingIcon && trailingIcon}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    gap: 4,
  },
});
