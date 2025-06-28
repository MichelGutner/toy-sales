import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { TButtonProps } from "./types";

export const Button = ({ label, onPress, disabled, loading }: TButtonProps) => {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      style={[style.container, { backgroundColor: color.primaryButton }]}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator color={color.white} />
      ) : (
        <ThemedText type="button">{label}</ThemedText>
      )}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
