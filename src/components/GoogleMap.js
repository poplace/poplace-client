import { StyleSheet, View, Dimensions, Alert, TouchableOpacity, Text } from "react-native";
import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

import CustomPin from "./CustomMarker";

import mock from "../../test.json";

export default function GoogleMap() {
  const [location, setLocation] = useState(null);
  const [isLocationServiceEnable, setIsLocationServiceEnable] = useState(true);
  const [pinsData, setPinsData] = useState([]);
  let mapViewCoordinate = {};

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

  useEffect(() => {
    if (location !== null) {
      setPinsData(mock);
      //지금은 이건데 나중에 서버랑 데이터 베이스랑 연결되면
      //RequestPinsData(location);
    }
  }, [location]);

  function handleGetPinsData() {
    RequestPinsData(mapViewCoordinate);
  }

  async function RequestPinsData(nowCoordinate) {
    const { longitude, latitude } = nowCoordinate;

    try {
      const pinData = await axios({
        method: "get",
        url: "url",
        params: {
          coordinate: { longitude, latitude },
        },
      });

      setPinsData(pinData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        region={location}
        showsUserLocation
        onRegionChangeComplete={(e) => {
          mapViewCoordinate = e;
        }}
      >
        <CustomPin pinsData={pinsData} />
      </MapView>
      <TouchableOpacity style={styles.getPinDataButton}>
        {/* {  현재는 서버가 구현되지 않았지만 서버가 구현되면, touchableopacity onpress 넣기} */}
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
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    top: 12,
    right: 120,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
