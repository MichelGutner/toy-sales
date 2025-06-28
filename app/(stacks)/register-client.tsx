import { Button, TextInputWithIcons } from "@/components/atoms";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { fakeCreateClientApi } from "@/services/fakeCreateClientApi";
import { router } from "expo-router";
import { useState } from "react";
import {
  NativeAppEventEmitter,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function RegisterClientScreen() {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  const [birthDate, setBirthDate] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  const handleConfirm = (date: Date) => {
    setBirthDate(
      date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    );
    hideDatePicker();
  };

  const clearInputs = () => {
    setName("");
    setEmail("");
    setBirthDate("");
    setShowPicker(false);
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      await fakeCreateClientApi({ name, email, birthDate });
      NativeAppEventEmitter.emit("ToastKey", {
        message: "Client created successfully",
        type: "success",
      });
      clearInputs();
      router.back();
    } catch (error: Error | any) {
      NativeAppEventEmitter.emit("ToastKey", {
        message: error.message || "Failed to create client",
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
          value={birthDate}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
          editable={false}
          textContentType="birthdate"
          placeholder="Ex: 01/01/2000"
          onPress={showDatePicker}
          onChangeText={setBirthDate}
          onSubmitEditing={handleCreate}
          onFocus={showDatePicker}
          leadingIcon={
            <IconSymbol name="calendar.and.person" color={color.icon} />
          }
        />
        <Button label="Salvar" onPress={handleCreate} loading={loading} />
        <Button label="Cancelar" onPress={router.back}  />
      </View>
      <DateTimePickerModal
        isVisible={showPicker}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale="pt-BR"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
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
