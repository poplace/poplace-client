import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Alert, TouchableOpacity, Text } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";

import { getPinsList, initPinsList } from "../features/pinsListSlice";
import { ALERT_MESSAGE, ERROR_MESSAGE } from "../constants/screens";
import CustomPin from "./CustomPin";
import {
  color,
  horizontalScale,
  verticalScale,
  height,
  width,
} from "../config/globalStyles";

export default function GoogleMap() {
  const [isLocationServiceEnable, setIsLocationServiceEnable] = useState(true);
  const mapViewCoordinateRef = useRef();
  const [location, setLocation] = useState(null);
  const defaultLocation = useRef({
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
    longitude: 127.0617409,
    latitude: 37.5072438,
  });
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(ALERT_MESSAGE.title, ERROR_MESSAGE.locationAccess, [
            { text: ALERT_MESSAGE.accept, onPress: () => setIsLocationServiceEnable(false) },
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

      } catch (err) {
        Alert.alert(ALERT_MESSAGE.title, ERROR_MESSAGE.failedGetLocation, [
          { text: ALERT_MESSAGE.accept },
        ]);

        return;
      }

    })();
  }, [isLocationServiceEnable]);

  useEffect(() => {
    if (location !== null) {
      dispatch(getPinsList(location));
    }

    return () => {
      dispatch(initPinsList());
    }
  }, [location, isFocused]);

  function handleGetPinsData() {
    dispatch(getPinsList(mapViewCoordinateRef.current));
  }

  function handleMapViewCoordinate(currentCoords) {
    mapViewCoordinateRef.current = currentCoords;
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        region={location || defaultLocation.current}
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
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  map: {
    height: height,
    width: width,
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
