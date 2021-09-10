import React from "react";
import { StyleSheet, View } from "react-native";

import { color, verticalScale } from "../config/globalStyles";
import MyPinList from "../components/shared/MyPinList";
import MyPageProfile from "../components/MyPageProfile";

export default function MyPage({ navigation }) {
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
