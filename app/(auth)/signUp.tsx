import { Button, TextInputWithIcons } from "@/components/atoms";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { PASSWORD_VISIBILITY_HIT_SLOP } from "@/constants/hitslop";
import { doLogin } from "@/services/loginApi";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  NativeAppEventEmitter,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function SignInScreen() {
  const [hashedPassword, setHashedPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "michelgutner@gmail.com",
    password: "123456",
  });

  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  const lockIconName = hashedPassword ? "lock" : "lock.open";
  const eyeIconName = hashedPassword ? "eye.slash" : "eye";
  const passwordPlaceholder = hashedPassword ? "Ex: ********" : "Ex: 123qwe!@#";

  const passwordRef = useRef<TextInput>(null);

  const handleTogglePasswordVisibility = () => {
    setHashedPassword((prev) => !prev);
  };

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onChangeEmail = (value: string) => {
    handleChange("email", value);
  };

  const onChangePassword = (value: string) => {
    handleChange("password", value);
  };

  const onSubmitEditingEmail = () => {
    passwordRef.current?.focus();
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await doLogin(form);
      router.replace("/(tabs)");
    } catch (error: Error | any) {
      NativeAppEventEmitter.emit("ToastKey", {
        message: error.message || "Falha ao entrar",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.navigate("/(auth)/signUp");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Toy Sales</ThemedText>
      <View style={styles.inputsContainer}>
        <TextInputWithIcons
          value={form.email}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          autoComplete="email"
          placeholder="Ex: email@gmail.com"
          onChangeText={onChangeEmail}
          returnKeyType="next"
          onSubmitEditing={onSubmitEditingEmail}
          leadingIcon={
            <IconSymbol name="envelope.badge.person.crop" color={color.icon} />
          }
        />

        <TextInputWithIcons
          ref={passwordRef}
          value={form.password}
          secureTextEntry={hashedPassword}
          clearButtonMode="while-editing"
          autoComplete="password"
          placeholder={passwordPlaceholder}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          returnKeyType="done"
          onChangeText={onChangePassword}
          onSubmitEditing={handleLogin}
          leadingIcon={<IconSymbol name={lockIconName} color={color.icon} />}
          trailingIcon={
            <TouchableOpacity
              onPress={handleTogglePasswordVisibility}
              hitSlop={PASSWORD_VISIBILITY_HIT_SLOP}
            >
              <IconSymbol name={eyeIconName} color={color.icon} />
            </TouchableOpacity>
          }
        />

        <Button label="Entrar" onPress={handleLogin} loading={loading} />
        <Button label="Cadastrar" onPress={handleRegister} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    flex: 1,
  },
  inputsContainer: {
    width: "100%",
    paddingHorizontal: 20,
    gap: 16,
  },
});
