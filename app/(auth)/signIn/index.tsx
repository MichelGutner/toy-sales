import { Button, TextInputWithIcons } from "@/components/atoms";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { doLogin } from "@/services/loginApi";
import { router } from "expo-router";
import { useState } from "react";
import {
  NativeAppEventEmitter,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { PASSWORD_VISIBILITY_HIT_SLOP } from "./constants";

export default function SignInScreen() {
  const [hashedPassword, setHashedPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  const lockIconName = hashedPassword ? "lock" : "lock.open";
  const eyeIconName = hashedPassword ? "eye.slash" : "eye";
  const passwordPlaceholder = hashedPassword ? "Ex: ********" : "Ex: 123qwe!@#";

  const handleTogglePasswordVisibility = () => {
    setHashedPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await doLogin({ email, password });
    } catch (error: Error | any) {
      NativeAppEventEmitter.emit("ToastKey", {
        message: error.message || "Login failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.navigate("/singUp");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Toy Sales</ThemedText>
      <View style={styles.inputsContainer}>
        <TextInputWithIcons
          value={email}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          autoComplete="email"
          placeholder="Ex: email@gmail.com"
          onChangeText={setEmail}
          leadingIcon={<IconSymbol name="envelope.badge.person.crop" color={color.icon} />}
        />
        <TextInputWithIcons
          value={password}
          secureTextEntry={hashedPassword}
          clearButtonMode="while-editing"
          autoComplete="password"
          placeholder={passwordPlaceholder}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          onChangeText={setPassword}
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  inputsContainer: {
    width: "100%",
    paddingHorizontal: 20,
    gap: 16,
  },
});
