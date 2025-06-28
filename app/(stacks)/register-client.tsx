import { Button, TextInputWithIcons } from "@/components/atoms";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useClientsContext } from "@/contexts";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  NativeAppEventEmitter,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function RegisterClientScreen() {
  const { addClient } = useClientsContext();
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];
  const [form, setForm] = useState({
    name: "",
    email: "",
    birthDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const birthDateRef = useRef<TextInput>(null);

  const showDatePicker = () => setShowPicker(true);
  const hideDatePicker = () => setShowPicker(false);

  const handleConfirm = (date: Date) => {
    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    setForm((prev) => ({ ...prev, birthDate: formattedDate }));
    hideDatePicker();
  };

  const clearInputs = () => {
    setForm({ name: "", email: "", birthDate: "" });
    setShowPicker(false);
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      await addClient(form.name, form.email, form.birthDate);
      NativeAppEventEmitter.emit("ToastKey", {
        message: "Client created successfully",
        type: "success",
      });
      clearInputs();
      router.back();
    } catch (error: any) {
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
          ref={nameRef}
          value={form.name}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          autoComplete="name"
          placeholder="Ex: John Doe"
          onChangeText={(text) => setForm((f) => ({ ...f, name: text }))}
          leadingIcon={<IconSymbol name="person.circle" color={color.icon} />}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        <TextInputWithIcons
          ref={emailRef}
          value={form.email}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          autoComplete="email"
          placeholder="Ex: email@gmail.com"
          onChangeText={(text) => setForm((f) => ({ ...f, email: text }))}
          leadingIcon={
            <IconSymbol name="envelope.badge.person.crop" color={color.icon} />
          }
          returnKeyType="next"
          onSubmitEditing={() => birthDateRef.current?.focus()}
          keyboardType="email-address"
        />
        <TextInputWithIcons
          ref={birthDateRef}
          value={form.birthDate}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
          editable={false}
          textContentType="birthdate"
          placeholder="Ex: 01/01/2000"
          onPress={showDatePicker}
          onFocus={showDatePicker}
          leadingIcon={
            <IconSymbol name="calendar.and.person" color={color.icon} />
          }
          onSubmitEditing={handleCreate}
        />
        <Button label="Salvar" onPress={handleCreate} loading={loading} />
        <Button label="Cancelar" onPress={router.back} />
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
