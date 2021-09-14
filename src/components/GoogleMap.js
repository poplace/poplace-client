import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Dimensions, Alert, TouchableOpacity, Text } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

import { getPinsList } from "../features/pinsListSlice";
import { ERROR_MESSAGE } from "../constants/utils";
import CustomPin from "./CustomPin";

export default function GoogleMap() {
  const [location, setLocation] = useState(null);
  const [isLocationServiceEnable, setIsLocationServiceEnable] = useState(true);
  const mapViewCoordinateRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {

        Alert.alert("알림", ERROR_MESSAGE.locationAccess, [
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
    <View>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        region={location}
        showsUserLocation
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
  map: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  getPinDataButton: {
    position: "absolute",
    width: 170,
    height: 100,
    backgroundColor: "white",
    borderRadius: 20,
    top: 40,
    right: 120,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
});
