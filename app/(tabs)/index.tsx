import { CircleButton, TextInputWithIcons } from "@/components/atoms";
import { Card } from "@/components/molecules";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { getFakeData } from "@/services/fakeApi";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, useColorScheme, View } from "react-native";

export default function HomeScreen() {
  const [data, setData] = useState();

  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  const handleRegisterClient = () => {
    router.navigate("/(stacks)/register-client");
  };

  async function fetchData() {
    try {
      const response = await getFakeData();
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  // Simulate fetching data from an API

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerContainer}>
        <TextInputWithIcons
          containerStyle={{ flex: 1 }}
          placeholder="Digite o que procura"
          trailingIcon={
            <IconSymbol name="magnifyingglass" color={color.icon} />
          }
        />
        <CircleButton
          onPress={handleRegisterClient}
          icon={<IconSymbol name="plus" color={color.white} />}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.info.nomeCompleto}
            subtitle={item.info.detalhes.nascimento}
            caption={item.info.missingLetter}
            leftIcon={
              <IconSymbol name="person.circle" size={30} color={color.icon} />
            }
          />
        )}
        contentContainerStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  headerContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
});
