import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet, SafeAreaView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import { color, verticalScale } from "../config/globalStyles";
import MorePageCard from "../components/MorePageCard";
import fetchMyPins from "../api/fetchMyPins";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentPin } from "../features/currentPinSlice";
import { selectUser } from "../features/userSlice";

export default function MorePageScreen({ route }) {
  const { id: userId, email } = useSelector(selectUser);
  const [pinsData, setPinsData] = useState([]);
  const dispatch = useDispatch();

  function renderItem(pinData) {
    dispatch(addCurrentPin(pinData));
    return <MorePageCard title={title} />;

    if (pinData.active) {
    }
  }

  const { title } = route.params;

  useEffect(() => {
    async function getMyPins() {
      try {
        const { myCreatedPins, mySavedPins } = await fetchMyPins(userId, email);

        if (title === "내가 생성한 핀") {
          setPinsData(myCreatedPins);
        }

        if (title === "내가 저장한 핀") {
          setPinsData(mySavedPins);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getMyPins();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={pinsData}
        keyExtractor={(pinData, index) => index.toString()}
        ListHeaderComponent={<View style={{ width: "100%", height: verticalScale(12) }} />}
        ListFooterComponent={<View style={{ width: "100%", height: verticalScale(12) }} />}
        renderItem={renderItem} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.poplaceWhite,
  },
});
