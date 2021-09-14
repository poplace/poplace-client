import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View, StyleSheet, SafeAreaView } from "react-native";

import { color, verticalScale } from "../config/globalStyles";
import MorePageCard from "../components/MorePageCard";
import fetchMyPins from "../api/fetchMyPins";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function MorePageScreen({ navigation, route }) {
  const { id: userId, email } = useSelector(selectUser);
  const [pinsData, setPinsData] = useState([]);
  const { title } = route.params;
  const isCreatedPins = title === "내가 생성한 핀";
  const isSavedPins = title === "내가 저장한 핀";

  function renderItem(pinData) {
    if (isCreatedPins) {
      return <MorePageCard title={title} pinData={pinData.item} navigation={navigation} />;
    }

    if (isSavedPins && pinData.item.active) {
      return <MorePageCard title={title} pinData={pinData.item} navigation={navigation} />;
    }
  }

  const getMyPins = useCallback(async () => {
    try {
      const { myCreatedPins, mySavedPins } = await fetchMyPins(userId, email);

      if (title === "내가 생성한 핀") {
        return setPinsData(myCreatedPins);
      }

      if (title === "내가 저장한 핀") {
        return setPinsData(mySavedPins);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
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
