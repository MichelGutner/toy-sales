import { PropsWithChildren } from "react";
import { ViewStyle } from "react-native";

export type TBottomsheetProps = PropsWithChildren<{
  onPressBackdrop: () => void;
  visible: boolean;
  contentContainerStyle?: ViewStyle;
}>;
