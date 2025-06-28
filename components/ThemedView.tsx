import { SafeAreaView, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View style={[{ padding: 16, flex: 1 }, style]} {...otherProps} />
    </SafeAreaView>
  );
}
