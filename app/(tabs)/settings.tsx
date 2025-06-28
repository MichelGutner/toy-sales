import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React from "react";
import {
  StyleSheet,
  useColorScheme,
  useWindowDimensions
} from "react-native";

export default function SettingsScreen() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  return <ThemedView style={estilos.container}></ThemedView>;
}

const estilos = StyleSheet.create({
  container: {
    gap: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  graphArea: {
    backgroundColor: "transparent",
    padding: 0,
  },
  graphTitle: {
    color: "#fff",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  cardTexto: {
    marginLeft: 12,
  },
  cardTitulo: {
    color: "#ccc",
    fontSize: 14,
  },
  cardSubtitulo: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
