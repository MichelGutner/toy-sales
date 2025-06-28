import "@/types";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { Toast } from "@/components/atoms/Toast";
import { ClientsProvider } from "@/contexts";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useEffect, useState } from "react";
import { NativeAppEventEmitter } from "react-native";

export type ToastData = {
  message: string;
  type: "success" | "error" | "info";
};

export default function RootLayout() {
  const [toastData, setToastData] = useState<ToastData>({
    message: "",
    type: "info",
  });
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const clearToast = () => {
    setToastData({ message: "", type: toastData.type });
  };

  useEffect(() => {
    const event = NativeAppEventEmitter.addListener("ToastKey", (data) => {
      setToastData(data);
    });

    return () => {
      event.remove();
    };
  }, []);

  if (!loaded) return null;

  return (
    <ActionSheetProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ClientsProvider>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(stacks)"
              options={{
                headerShown: false,
                presentation: "containedModal",
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
          <Toast {...toastData} onClose={clearToast} />
        </ClientsProvider>
      </ThemeProvider>
    </ActionSheetProvider>
  );
}
