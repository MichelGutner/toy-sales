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

export const Card = ({
  onPress,
  leftIcon,
  title,
  subtitle,
  caption,
}: TCardProps) => {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { backgroundColor: color.card }]}
    >
      {leftIcon}
      <View style={{ flex: 1 }}>
        <ThemedText
          style={{ textTransform: "capitalize" }}
          numberOfLines={1}
          type="default"
        >
          {title}
        </ThemedText>
        <View style={styles.subtitleContainer}>
          <ThemedText style={{ flex: 1 }} type="captionBold">
            {subtitle}
          </ThemedText>
          <ThemedText type="caption">{caption}</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  subtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
