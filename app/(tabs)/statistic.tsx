import { Loading } from "@/components/atoms";
import { Card } from "@/components/molecules";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useClientsContext } from "@/contexts";
import React from "react";
import {
  Image,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function StatisticScreen() {
  const { clients } = useClientsContext();

  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  const sortedSalesDates = clients.data
    .flatMap((item) =>
      item.statistics.vendas.map((sale) => {
        const date = new Date(sale.data);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        return { date: `${day}/${month}`, value: sale.valor };
      })
    )
    .sort((a, b) => {
      const [dayA, monthA] = a.date.split("/").map(Number);
      const [dayB, monthB] = b.date.split("/").map(Number);

      if (monthA === monthB) {
        return dayA - dayB;
      }

      return monthA - monthB;
    });

  const salesData = {
    labels: sortedSalesDates.map((d) => d.date).slice(0, 7),
    datasets: [
      {
        data: sortedSalesDates.map((d) => d.value).slice(0, 7),
        strokeWidth: 3,
        color: () => color.tabIconSelected,
      },
    ],
  };

  if (clients.loading) {
    return <Loading />;
  }

  return (
    <ThemedView style={estilos.container}>
      <View style={estilos.header}>
        <ThemedText type="title">Dashboard</ThemedText>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={estilos.avatar}
        />
      </View>
      <ThemedText type="subtitle">Summary</ThemedText>
      <View style={estilos.graphArea}>
        <ThemedText style={{ alignSelf: "center" }} type="defaultSemiBold">
          Sales by Day
        </ThemedText>
        <LineChart
          data={salesData}
          width={width - 20}
          height={250}
          withShadow
          yAxisLabel="R$"
          chartConfig={{
            decimalPlaces: 0,
            backgroundGradientFrom: `${color.background}`,
            backgroundGradientTo: `${color.background}`,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: () => `${color.text}`,
            propsForBackgroundLines: {
              strokeWidth: "0.7",
            },
            propsForDots: {
              r: "4",
              strokeWidth: "1",
              stroke: `${color.background}`,
            },
          }}
          style={{ alignSelf: "center" }}
          bezier
        />
      </View>

      <Card
        title={clients.withMostSales.name}
        subtitle="Top 1 vendas"
        leftIcon={<IconSymbol name="trophy.fill" color="#f1c40f" />}
      />
      <Card
        title={clients.withMostAverage.name}
        subtitle="Top 1 média vendas"
        leftIcon={<IconSymbol name="trophy.fill" color="#f1c40f" />}
      />
      <Card
        title={clients.withMostPurchases.name}
        subtitle="Top 1 compras"
        leftIcon={<IconSymbol name="trophy.fill" color="#f1c40f" />}
      />
    </ThemedView>
  );
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
