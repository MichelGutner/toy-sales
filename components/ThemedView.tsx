import { SafeAreaView, View, type ViewProps } from "react-native";

import { isIOS } from "@/constants/platform";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const { top } = useSafeAreaInsets();
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View
        style={[
          { padding: 16, flex: 1, paddingTop: !isIOS ? top + 16 : 16 },
          style,
        ]}
        {...otherProps}
      />
    </SafeAreaView>
  );
}
