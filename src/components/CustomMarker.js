import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Marker } from "react-native-maps";

export default function CustomPin({ pinsData }) {
  return (
    <Marker
      coordinate={{
        longitude: 127.0610543,
        latitude: 37.5080574,
      }}
    >
      <View style={styles.pin}>
        <Image source={require("../assets/favicon.png")} style={styles.profileImage} />
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  pin: {
    width: 33,
    height: 33,
    backgroundColor: "#F78582",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 30,
    transform: [{ rotate: "315deg" }],
  },
  profileImage: {
    width: 27,
    height: 27,
    marginTop: 7,
    marginLeft: 7,
  },
});
