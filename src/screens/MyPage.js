import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import axios from "axios";

import { color, verticalScale } from "../config/globalStyles";
import MyPinList from "../components/shared/MyPinList";
import MyPageProfile from "../components/MyPageProfile";
import { API_SERVER_URL } from "@env";

export default function MyPage({ navigation }) {
  useEffect(() => {
    async function fetchMyPage() {
      try {
        const result = await axios.get(`${API_SERVER_URL}/pins`, {
          params: {
            email: "onea8906@gmail.com",
          },
          validateStatus: (state) => state < 500,
        }, {
          "Content-Type": "application/json",
        });

        if (result.data.code === 400) {
          console.log(result.data.message);
          return;
        }
        console.log(result.data);

      } catch (err) {
        console.log(err);
      }
    }

    fetchMyPage();
  }, []);

  return (
    <View style={styles.container}>
      <MyPageProfile />
      <View style={styles.listContainer}>
        <MyPinList title="내가 생성한 핀" />
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
