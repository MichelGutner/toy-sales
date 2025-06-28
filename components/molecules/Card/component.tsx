import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { TCardProps } from "./types";

export const Card = ({ onPress, leftIcon, title, subtitle }: TCardProps) => {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: color.card }]}>
      {leftIcon}
      <View>
        <ThemedText type="default">{title}</ThemedText>
        <ThemedText type="caption">{subtitle}</ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
