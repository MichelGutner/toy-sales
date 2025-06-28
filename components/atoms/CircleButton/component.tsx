import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { TCircleButtonProps } from "./types";

export const CircleButton = ({ icon, onPress }: TCircleButtonProps) => {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color.primaryButton }]}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
