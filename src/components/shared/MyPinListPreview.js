import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { color, verticalScale, horizontalScale, moderateScale } from "../../config/globalStyles";

export default function MyPinListPreview({ pins }) {
  const hasPins = Boolean(pins.length);

  return (
    <ScrollView horizontal style={styles.container}>
      {hasPins ?
        pins.map((pin) => {
          return (
            <TouchableOpacity
              key={pin.image[0].split(".").join("").slice(-20)}
              activeOpacity={1}
              onPress={() => console.log("콘텐츠..")}>
              <Image style={styles.pins} source={{ uri: pin.image[0] }} />
            </TouchableOpacity>
          )
        }) :
        <View style={styles.pins}>
          <FontAwesome5 name="mountain" size={60} color={color.poplaceGray} />
        </View>
      }
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
    backgroundColor: color.poplaceMiddleGray,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
