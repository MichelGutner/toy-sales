import { CircleButton, TextInputWithIcons } from "@/components/atoms";
import { Loading } from "@/components/atoms/Loading/component";
import { Card } from "@/components/molecules";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { isIOS } from "@/constants/platform";
import { Cliente, getFakeData } from "@/services/fakeApi";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { bottom } = useSafeAreaInsets();
  const [data, setData] = useState<Cliente[]>([]);
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];
  const handleRegisterClient = () => {
    router.navigate("/(stacks)/register-client");
  };

  const handleNavigateToClientDetails = (client: Cliente) => {
    router.push({
      pathname: "/(stacks)/client-details",
      params: {
        name: client.name,
        email: client.email,
        birthDate: client.birthDate,
        total: client.statistics.total.toFixed(2),
        average: client.statistics.average.toFixed(2),
        quantity: client.statistics.total.toString(),
        missingAlphabetLetter: client.missingAlphabetLetter || "-",
      },
    });
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
      <View style={styles.informativeContainer}>
        <ThemedText type="defaultSemiBold">Total de clientes</ThemedText>
        <ThemedText type="defaultSemiBold">{data.length}</ThemedText>
      </View>
      <FlatList
        data={data}
        keyExtractor={(_, i) => i.toString()}
        ListEmptyComponent={Loading}
        renderItem={({ item }) => (
          <Card
            onPress={handleNavigateToClientDetails.bind(null, item)}
            title={item?.name}
            subtitle={item?.birthDate}
            caption={item?.missingAlphabetLetter}
            leftIcon={
              <IconSymbol name="person.circle" size={30} color={color.icon} />
            }
          />
        )}
        contentContainerStyle={{
          flexGrow: 1,
          gap: 12,
          paddingBottom: isIOS ? bottom + 12 : 0,
        }}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
  headerContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  informativeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
