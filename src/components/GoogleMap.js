import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Alert, TouchableOpacity, Text } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

import { getPinsList } from "../features/pinsListSlice";
import CustomPin from "./CustomPin";
import {
  color,
  height,
  horizontalScale,
  verticalScale,
  windowHeight,
  windowWidth,
} from "../config/globalStyles";

export default function GoogleMap() {
  const [location, setLocation] = useState(null);
  const [isLocationServiceEnable, setIsLocationServiceEnable] = useState(true);
  const mapViewCoordinateRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        const alertMessage = "위치정보 활용 동의가 필요합니다";

        Alert.alert("알림", alertMessage, [
          { text: "취소" },
          { text: "확인", onPress: () => setIsLocationServiceEnable(false) },
        ]);
        return;
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

  useEffect(() => {
    if (location !== null) {
      dispatch(getPinsList(location));
    }
  }, [location]);

  function handleGetPinsData() {
    dispatch(getPinsList(mapViewCoordinateRef.current));
  }

  function handleMapViewCoordinate(e) {
    mapViewCoordinateRef.current = e;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        region={location}
        showsUserLocation
        mapPadding={{
          top: 27,
        }}
        onRegionChangeComplete={handleMapViewCoordinate}
      >
        <CustomPin />
      </MapView>
      <TouchableOpacity style={styles.getPinDataButton} onPress={handleGetPinsData}>
        <Text>현재 위치에서 다시 검색</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  map: {
    height: windowHeight,
    width: windowWidth,
  },
  getPinDataButton: {
    top: verticalScale(40),
    position: "absolute",
    width: horizontalScale(220),
    backgroundColor: color.poplaceWhite,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(15),
    borderRadius: 100,
    shadowColor: color.poplaceDark,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
});
