import { Button } from "@/components/atoms";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function ClientDetailsScreen() {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  const {
    name,
    email,
    birthDate,
    totalVendas,
    mediaVendas,
    quantidadeVendas,
    missingAlphabetLetter,
  } = useLocalSearchParams<{
    name: string;
    email: string;
    birthDate: string;
    totalVendas: string;
    mediaVendas: string;
    quantidadeVendas: string;
    missingAlphabetLetter: string;
  }>();

  // verficar possibilidade de adicionar conquistas do mês

  return (
    <ThemedView style={styles.container}>
      <IconSymbol name="person.crop.circle.fill" size={64} color={color.tint} />

      <ThemedText type="title">{name}</ThemedText>
      <View style={styles.infoBlock}>
        <LabelValue label="E-mail" value={email} />
        <LabelValue label="Data de nascimento" value={birthDate} />
        <LabelValue label="Total em vendas" value={`R$ ${totalVendas}`} />
        <LabelValue label="Média por venda" value={`R$ ${mediaVendas}`} />
        <LabelValue label="Compras realizadas" value={quantidadeVendas} />
        <LabelValue
          label="Letra faltando no nome"
          value={missingAlphabetLetter || "-"}
        />
      </View>
      <Button label="Sair" onPress={router.back} />
    </ThemedView>
  );
}

function LabelValue({ label, value }: { label: string; value?: string }) {
  return (
    <View style={styles.labelContainer}>
      <ThemedText type="defaultSemiBold">{label}</ThemedText>
      <ThemedText type="default">{value || "-"}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  infoBlock: {
    width: "100%",
    gap: 16,
    marginTop: 24,
  },
  labelContainer: {
    gap: 4,
  },
});
