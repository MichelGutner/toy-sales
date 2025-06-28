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
  Image,
  NativeAppEventEmitter,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
const logoImage = require("@/assets/images/logo.png");

export default function SignInScreen() {
  const [hashedPassword, setHashedPassword] = useState(true);
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  const lockIconName = hashedPassword ? "lock" : "lock.open";
  const eyeIconName = hashedPassword ? "eye.slash" : "eye";
  const passwordPlaceholder = hashedPassword ? "Ex: ********" : "Ex: 123qwe!@#";

  const passwordInputRef = useRef<TextInput>(null);

  const handleTogglePasswordVisibility = () => {
    setHashedPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await doLogin({ email, password });
      router.replace("/(tabs)");
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
    router.navigate("/(auth)/signUp");
  };

  return (
    <ThemedView style={styles.container}>
      <Image source={logoImage} style={styles.logo} resizeMode="contain" />
      <ThemedText type="title">Toy Sales</ThemedText>
      <View style={styles.inputsContainer}>
        <TextInputWithIcons
          value={email}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          autoComplete="email"
          placeholder="Ex: email@gmail.com"
          onChangeText={setEmail}
          returnKeyType="next"
          onSubmitEditing={passwordInputRef.current?.focus}
          leadingIcon={
            <IconSymbol name="envelope.badge.person.crop" color={color.icon} />
          }
        />
        <TextInputWithIcons
          ref={passwordInputRef}
          value={password}
          secureTextEntry={hashedPassword}
          clearButtonMode="while-editing"
          autoComplete="password"
          placeholder={passwordPlaceholder}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          returnKeyType="done"
          onSubmitEditing={handleLogin}
          onChangeText={setPassword}
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
    gap: 32,
  },
  inputsContainer: {
    width: "100%",
    paddingHorizontal: 20,
    gap: 16,
  },
  logo: { width: 150, height: 150 },
});
