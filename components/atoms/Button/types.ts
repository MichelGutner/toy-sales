export type TButtonProps = {
  label: string;
  onPress: VoidFunction;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary"
};
