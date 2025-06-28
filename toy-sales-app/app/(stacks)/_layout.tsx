import { Stack } from "expo-router";

export default function StacksLayout() {
  return (
    <Stack>
      <Stack.Screen name="register-client" options={{ headerShown: false }} />
      <Stack.Screen name="client-details" options={{ headerShown: false }} />
    </Stack>
  );
}
