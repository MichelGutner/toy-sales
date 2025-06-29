import { Button } from "@/components/atoms";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { TClientDetailsRouteParams } from "@/types/routes.types";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, useColorScheme, View } from "react-native";
import i18n from "../../i18n";

export default function ClientDetailsScreen() {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  const {
    name,
    email,
    birthDate,
    average,
    quantity,
    total,
    missingAlphabetLetter,
  } = useLocalSearchParams<TClientDetailsRouteParams>();

  return (
    <ThemedView style={styles.container}>
      <IconSymbol name="person.crop.circle.fill" size={64} color={color.tint} />

      <ThemedText type="title">{name}</ThemedText>
      <View style={styles.infoBlock}>
        <LabelValue label={i18n.t("email")} value={email} />
        <LabelValue label={i18n.t("birthDate")} value={birthDate} />
        <LabelValue label={i18n.t("totalSales")} value={`R$ ${total}`} />
        <LabelValue label={i18n.t("averagePerSale")} value={`R$ ${average}`} />
        <LabelValue label={i18n.t("purchasesMade")} value={quantity} />
        <LabelValue
          label={i18n.t("missingAlphabetLetter")}
          value={missingAlphabetLetter || "-"}
        />
      </View>
      <Button label={i18n.t("back")} onPress={router.back} />
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
