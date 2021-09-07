import { StyleSheet, View, Dimensions, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";

import CustomPin from "./CustomMarker";

export default function GoogleMap() {
  const [location, setLocation] = useState(null);
  const [isLocationServiceEnable, setIsLocationServiceEnable] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        const alertMessage = "위치정보 활용 동의가 필요합니다";

        Alert.alert("알림", alertMessage, [
          { text: "취소" },
          { text: "확인", onPress: () => setIsLocationServiceEnable(false) },
        ]);
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const {
        coords: { longitude, latitude },
      } = currentLocation;

      setLocation({
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        longitude,
        latitude,
      });
    })();
  }, [isLocationServiceEnable]);

  return (
    <View>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        region={location}
        showsUserLocation
      >
        <CustomPin />
      </MapView>
    </View>
  );
}

const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  map: {
    height,
    width,
  },
});
