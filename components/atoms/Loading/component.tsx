import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native";

export const Loading = () => {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" color={color.white} />
      <ThemedText type="default">Carregando...</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
