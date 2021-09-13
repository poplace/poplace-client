import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";

import { turnOnOffModal } from "../features/modalVisibleSlice";
import { addCurrentPin } from "../features/currentPinSlice";
import { selectPinsList } from "../features/pinsListSlice";

export default function CustomPin() {
  const dispatch = useDispatch();
  const { pinsList } = useSelector(selectPinsList);

  function handlePopSlideModal(pin) {
    dispatch(turnOnOffModal());
    dispatch(addCurrentPin(pin));
  }

  console.log("😍", pinsList, pinsList.length);
  return (
    <View>
      {pinsList.map((pin) => {
        if (pin._id) {
          const [longitude, latitude] = pin.position.coordinates;
          const imgUri = pin.image[0];

          return (
            <View key={pin._id}>
              <Marker
                key={pin._id}
                coordinate={{ longitude, latitude }}
                style={styles.pinContainer}
                onPress={() => handlePopSlideModal(pin)}
              >
                <View style={styles.pin}>
                  <Image source={{ uri: imgUri }} style={styles.pinImage} />
                </View>
              </Marker>
            </View>
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  pinContainer: {
    flex: 1,
    width: 60,
    height: 60,
  },
  pin: {
    position: "relative",
    width: 50,
    height: 50,
    backgroundColor: "#F78582",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 30,
    transform: [{ rotate: "315deg" }],
  },
  pinImage: {
    width: 38,
    height: 38,
    marginTop: 6,
    marginLeft: 5.7,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "white",
    transform: [{ rotate: "405deg" }],
  },
});
