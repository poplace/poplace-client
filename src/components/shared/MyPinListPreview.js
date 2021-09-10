import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import { verticalScale, horizontalScale, moderateScale } from "../../config/globalStyles";
import data from "../../mock.json";

export default function MyPinListPreview() {
  return (
    <ScrollView horizontal style={styles.container}>
      {data.map((img) => {
        return (
          <TouchableOpacity
            key={img.split(".").join("").slice(-20)}
            activeOpacity={1}
            onPress={() => console.log("콘텐츠..")}>
            <Image
              style={styles.pins}
              source={{
                uri: img,
              }} />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: "10%",
    marginTop: "5%",
    paddingTop: "1%",
    width: "100%",
  },
  pins: {
    marginRight: moderateScale(12),
    width: horizontalScale(120),
    height: verticalScale(120),
    borderRadius: 15,
  },
});
