import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";

import { turnOnOffModal } from "../features/modalVisibleSlice";
import { addCurrentPin } from "../features/currentPinSlice";
import { selectPinsList } from "../features/pinsListSlice";

export default function CustomPin() {
  const dispatch = useDispatch();
  const pinsList = useSelector(selectPinsList);

  function handlePopSlideModal(pin) {
    dispatch(turnOnOffModal());
    dispatch(addCurrentPin(pin));
  }

  return (
    <>
      {pinsList.map((pin, index) => {
        const { location: { latitude, longitude }} = pin;

        return (
          <View key={index}>
            <Marker
              key={index}
              coordinate={{ latitude, longitude }}
              style={styles.pinContainer}
              onPress={() => handlePopSlideModal(pin)}
            >
              <View style={styles.pin}>
                <Image source={require("../assets/favicon.png")} style={styles.profileImage} />
              </View>
            </Marker>
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  pinContainer: {
    width: 60,
    height: 60,
  },
  pin: {
    width: 50,
    height: 50,
    backgroundColor: "#F78582",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 30,
    transform: [{ rotate: "315deg" }],
  },
  profileImage: {
    width: 35,
    height: 35,
    marginTop: 7,
    marginLeft: 7,
  },
});
