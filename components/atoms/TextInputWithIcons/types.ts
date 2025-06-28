import { TextInputProps } from "react-native";

export type TTextInputWithIconsProps = TextInputProps & {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
};
