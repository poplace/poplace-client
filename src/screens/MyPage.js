import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";

import { useSelector } from "react-redux";
import { color, verticalScale } from "../config/globalStyles";
import MyPinList from "../components/shared/MyPinList";
import MyPageProfile from "../components/MyPageProfile";
import { selectUser } from "../features/userSlice";

export default function MyPage({ navigation }) {
  const [myCreatedPin, setMyCreatedPin] = useState([]);
  const email = useSelector(selectUser).email;

  useEffect(() => {
    async function fetchMyCreatedPin() {
      const response = await axios.get(`${API_SERVER_URL_HOME}/pins`, {
            params: {
              email,
            },
            validateStatus: (state) => state < 500,
      });

      if (response.data.code === 400) {
        console.log(response.data.code);
          return;
        }

      const { pins } = response.data;

      setMyCreatedPin(pins);
    }

    fetchMyCreatedPin();
  }, []);

  return (
    <View style={styles.container}>
      <MyPageProfile />
      <View style={styles.listContainer}>
        <MyPinList title="내가 생성한 핀" pins={myCreatedPin} />
        <MyPinList title="내가 저장한 핀" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.poplaceWhite,
  },
  listContainer: {
    height: verticalScale(340),
    paddingLeft: "7%",
    bottom: "1%",
  },
});
