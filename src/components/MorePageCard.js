import React from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { color, moderateScale, horizontalScale, verticalScale } from "../config/globalStyles";

export default function MorePageCard({ pinsData }) {

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => { console.log("상세페이지로..") }}>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <Image
            style={styles.previewContainer}
            source={{ uri: pinsData.item.image[0] }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.timeText}>
              남은시간: {pinsData.item.remain}
            </Text>
            <View style={styles.bodyContainer}>
              {pinsData.item.tags.map((tag) => {
                return <Text style={styles.tagsText}>{tag}</Text>
              })}
            </View>
            <View style={styles.textBox}>
              <Text style={styles.text}>{pinsData.item.text.slice(0, 15) + "..."}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: verticalScale(110),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: color.poplaceWhite,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
    paddingHorizontal: horizontalScale(10),
    marginVertical: verticalScale(6),
    marginHorizontal: horizontalScale(14),
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  previewContainer: {
    height: verticalScale(80),
    width: horizontalScale(80),
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    marginLeft: verticalScale(10),
  },
  timeText: {
    fontSize: moderateScale(14),
    color: color.poplaceDark,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  bodyContainer: {
    flexDirection: "row",
    marginTop: verticalScale(5),
  },
  tagsText: {
    color: color.poplaceWhite,
    backgroundColor: color.poplaceRed,
    fontSize: moderateScale(10),
    textAlign: "center",
    fontWeight: "700",
    borderRadius: 30,
    marginRight: horizontalScale(5),
    paddingVertical: verticalScale(2),
    paddingHorizontal: moderateScale(8),
  },
  textBox: {
    width: "100%",
  },
  text: {
    color: color.poplaceGray,
    marginTop: verticalScale(5),
    fontSize: moderateScale(12),
  },
});
