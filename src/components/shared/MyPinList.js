import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { color, moderateScale } from "../../config/globalStyles";

import MyPinListPreview from "../shared/MyPinListPreview";

export default function MyPinList({ title, pins }) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.subText} onPress={() => console.log("더보기..")}>
          더보기 {">"}
        </Text>
      </View>

      <MyPinListPreview pins={pins} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    top: "14%",
    alignItems: "center",
    flexDirection: "row",
  },
  headerText: {
    color: color.poplaceDark,
    fontSize: moderateScale(16),
    fontWeight: "700",
  },
  subText: {
    fontSize: moderateScale(12),
    marginLeft: "3%",
    color: color.poplaceGray,
  },
});
