import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function CustomBottomTabBarButton({ children, onPress }) {
  return (
    <TouchableOpacity
      style={styles.CustomTabBar}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.CustomTabBarCircle}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  CustomTabBar: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
  },
  CustomTabBarCircle: {
    width: 75,
    height: 75,
    borderRadius: 35,
    backgroundColor: "#766162",
  },
});
