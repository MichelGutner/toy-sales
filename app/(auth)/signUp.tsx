import { Button, TextInputWithIcons } from "@/components/atoms";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { EVENT_KEY } from "@/constants/global";
import { PASSWORD_VISIBILITY_HIT_SLOP } from "@/constants/hitslop";
import { doCreateUser } from "@/services/loginApi";
import { router } from "expo-router";
import { useState } from "react";
import {
  NativeAppEventEmitter,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import i18n from "../../i18n";

export default function SignUpScreen() {
  const [hashedPassword, setHashedPassword] = useState(true);
  const [name, setName] = useState("Test");
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  const lockIconName = hashedPassword ? "lock" : "lock.open";
  const eyeIconName = hashedPassword ? "eye.slash" : "eye";
  const passwordPlaceholder = hashedPassword ? "Ex: ********" : "Ex: 123qwe!@#";

  const handleTogglePasswordVisibility = () => {
    setHashedPassword((prev) => !prev);
  };

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      await doCreateUser({ name, email, password });
      NativeAppEventEmitter.emit(EVENT_KEY.toast, {
        message: i18n.t("createUserSuccessMessage"),
        type: "success",
      });
      clearInputs();
      router.back();
    } catch (error: Error | any) {
      NativeAppEventEmitter.emit(EVENT_KEY.toast, {
        message: error.message || i18n.t("createUserFailedMessage"),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.inputsContainer}>
        <TextInputWithIcons
          value={name}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          autoComplete="name"
          placeholder="Ex: John Doe"
          onChangeText={setName}
          leadingIcon={<IconSymbol name="person.circle" color={color.icon} />}
        />
        <TextInputWithIcons
          value={email}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          autoComplete="email"
          placeholder="Ex: email@gmail.com"
          onChangeText={setEmail}
          leadingIcon={
            <IconSymbol name="envelope.badge.person.crop" color={color.icon} />
          }
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
          onSubmitEditing={handleCreate}
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
        <Button
          label={i18n.t("saveButton")}
          onPress={handleCreate}
          loading={loading}
        />
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
