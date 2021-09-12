import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { API_SERVER_URL } from "@env";
import axios from "axios";

import { useSelector } from "react-redux";
import { color, verticalScale } from "../config/globalStyles";
import { selectUser } from "../features/userSlice";
import MyPinList from "../components/shared/MyPinList";
import MyPageProfile from "../components/MyPageProfile";

export default function MyPage({ navigation }) {
  const [myCreatedPins, setMyCreatedPins] = useState([]);
  const [mySavedPins, setMySavedPins] = useState([]);
  const { email } = useSelector(selectUser);

  useEffect(() => {
    async function fetchMyPins() {
      try {
        const response = await axios.get(`${API_SERVER_URL}/pins`, {
          params: {
            email,
          },
          validateStatus: (state) => state < 500,
        });

        if (response.data.code === 400) {
          console.log(response.data.code);
          return;
        }

        const { myCreatedPins, mySavedPins } = response.data;

        setMyCreatedPins(myCreatedPins);
        setMySavedPins(mySavedPins);
      } catch (err) {
        console.log(err);
      }
    }

    fetchMyPins();
  }, []);

  return (
    <View style={styles.container}>
      <MyPageProfile />
      <View style={styles.listContainer}>
        <MyPinList title="내가 생성한 핀" pins={myCreatedPins} navigation={navigation} />
        <MyPinList title="내가 저장한 핀" pins={mySavedPins} navigation={navigation} />
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
