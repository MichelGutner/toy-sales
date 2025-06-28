import { CircleButton, TextInputWithIcons } from "@/components/atoms";
import { Loading } from "@/components/atoms/Loading/component";
import { Card } from "@/components/molecules";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { EVENT_KEY } from "@/constants/global";
import { isIOS } from "@/constants/platform";
import { useClientsContext } from "@/contexts";
import { TNormalizedClient } from "@/types/clients";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { router } from "expo-router";
import {
  FlatList,
  NativeAppEventEmitter,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { bottom } = useSafeAreaInsets();
  const { clients } = useClientsContext();
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];
  const { showActionSheetWithOptions } = useActionSheet();
  const { deleteClient } = useClientsContext();

  const handleClientAction = async (client: TNormalizedClient, currentIndex: number) => {
    const options = ["Abrir", "Deletar", "Cancelar"];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      async (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            await handleNavigateToClientDetails(client);
            break;
          case destructiveButtonIndex:
            await handleDeleteClient(currentIndex);
            break;
          case cancelButtonIndex:
            router.canGoBack() && router.back();
            break;
        }
      }
    );
  };

  const handleRegisterClient = () => {
    router.navigate("/(stacks)/register-client");
  };

  const handleNavigateToClientDetails = (client: TNormalizedClient) => {
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

  const handleDeleteClient = async (index: number) => {
    try {
      await deleteClient(index);
      NativeAppEventEmitter.emit(EVENT_KEY.toast, {
        message: "Client deleted with successfully",
        type: "success",
      });
    } catch (error: Error | any) {
      NativeAppEventEmitter.emit(EVENT_KEY.toast, {
        message: error.message || "Failed to delete client",
        type: "error",
      });
    }
  };

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
        <ThemedText type="defaultSemiBold">{clients.data.length}</ThemedText>
      </View>
      <FlatList
        data={clients.data}
        keyExtractor={(_, i) => i.toString()}
        ListEmptyComponent={Loading}
        renderItem={({ item, index }) => (
          <Card
            onPress={handleClientAction.bind(null, item, index)}
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
