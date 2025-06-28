import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { TTextInputWithIconsProps } from "./types";

export const TextInputWithIcons = ({
  leadingIcon,
  trailingIcon,
  ...props
}: TTextInputWithIconsProps) => {
  return (
    <View style={style.container}>
      {leadingIcon && leadingIcon}
      <TextInput {...props} style={{ flex: 1 }} />
      {trailingIcon && trailingIcon}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    gap: 4,
  },
});
