import { Colors } from "@/constants/Colors";
import React, { forwardRef } from "react";
import { StyleSheet, TextInput, useColorScheme, View } from "react-native";
import { TTextInputWithIconsProps } from "./types";

export const TextInputWithIcons = forwardRef<TextInput, TTextInputWithIconsProps>(
  ({ leadingIcon, trailingIcon, containerStyle, style: inputStyle, ...props }, ref) => {
    const colorScheme = useColorScheme();
    const color = Colors[colorScheme ?? "light"];

    return (
      <View style={[styles.container, containerStyle]}>
        {leadingIcon && leadingIcon}
        <TextInput
          ref={ref}
          {...props}
          style={[{ flex: 1, color: color.text }, inputStyle]}
        />
        {trailingIcon && trailingIcon}
      </View>
    );
  }
);

TextInputWithIcons.displayName = "TextInputWithIcons";

const styles = StyleSheet.create({
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
