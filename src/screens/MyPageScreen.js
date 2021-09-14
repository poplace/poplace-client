import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { color, verticalScale } from "../config/globalStyles";
import { selectUser } from "../features/userSlice";
import MyPinList from "../components/shared/MyPinList";
import MyPageProfile from "../components/MyPageProfile";
import fetchMyPins from "../api/fetchMyPins";

export default function MyPageScreen({ navigation }) {
  const [myCreatedPins, setMyCreatedPins] = useState([]);
  const [mySavedPins, setMySavedPins] = useState([]);
  const { id: userId, email } = useSelector(selectUser);

  useEffect(() => {
    async function getMyPins() {
      try {
        const { myCreatedPins, mySavedPins } = await fetchMyPins(userId, email);

        setMyCreatedPins(myCreatedPins);
        setMySavedPins(mySavedPins);
      } catch (err) {
        console.log(err);
      }
    }

    getMyPins();
  }, []);

  return (
    <View style={styles.container}>
      <MyPageProfile />
      <View style={styles.listContainer}>
        <MyPinList
          title="내가 생성한 핀"
          pins={myCreatedPins}
          navigation={navigation}
        />
        <MyPinList
          title="내가 저장한 핀"
          pins={mySavedPins}
          navigation={navigation}
        />
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
