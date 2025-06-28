import { TextInputProps, ViewStyle } from "react-native";

export type TTextInputWithIconsProps = TextInputProps & {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
};
