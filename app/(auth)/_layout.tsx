import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="signIn/index" options={{ headerShown: false }} />
      <Stack.Screen name="signUp/index" options={{ headerShown: true }} />
    </Stack>
  );
}
