import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

type ToastType = "info" | "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose?: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  const translateY = useSharedValue(-100);
  const { top } = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const hide = () => {
    translateY.value = withTiming(-top, {
      duration: 200,
      easing: Easing.in(Easing.ease),
    });
  };

  const show = () => {
    translateY.value = withTiming(top + 10, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
  };

  React.useEffect(() => {
    if (message) show();
    const e = setTimeout(() => {
      hide();
      onClose?.();
    }, 3000);
    return () => clearTimeout(e);
  }, [message]);

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#4CAF50";
      case "error":
        return "#F44336";
      case "info":
      default:
        return "#2196F3";
    }
  };

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        animatedStyle,
        { backgroundColor: getBackgroundColor() },
      ]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    left: width * 0.1,
    width: width * 0.8,
    padding: 15,
    borderRadius: 10,
    zIndex: 1000,
    elevation: 5,
  },
  toastText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
