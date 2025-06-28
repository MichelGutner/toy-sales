import React from "react";
import { SafeAreaView, StyleSheet, useColorScheme, View } from "react-native";
import Modal from "react-native-modal";

import { Colors } from "@/constants/Colors";
import { TBottomsheetProps } from "./types";

export const BottomSheet = ({
  children,
  onPressBackdrop,
  visible,
  contentContainerStyle,
}: TBottomsheetProps) => {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"];

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onPressBackdrop}
      onSwipeComplete={onPressBackdrop}
      statusBarTranslucent
      swipeDirection="down"
      // useNativeDriver
      // useNativeDriverForBackdrop
      style={styles.container}
    >
      <View style={[styles.content, { backgroundColor: color.background }]}>
        <SafeAreaView>
          <View style={[styles.indicator, { backgroundColor: color.icon }]} />
          <View style={contentContainerStyle}>{children}</View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: "flex-end",
  },
  content: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  indicator: {
    width: 40,
    height: 5,
    alignSelf: "center",
    borderRadius: 2.5,
    marginBottom: 10,
  },
});
