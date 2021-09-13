import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { color, horizontalScale, moderateScale, verticalScale } from "../config/globalStyles";

export default function CustomBottomTabBarButton({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.CustomTabBar} activeOpacity={1} onPress={onPress}>
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
    width: horizontalScale(90),
    height: verticalScale(90),
    borderRadius: moderateScale(100),
    backgroundColor: color.poplaceLight,
  },
});
