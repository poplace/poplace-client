import React from "react";
import { FlatList, View, StyleSheet, SafeAreaView } from "react-native";

import { color, verticalScale } from "../config/globalStyles";
import MorePageCard from "../components/MorePageCard";
import data from "../components/mock/pinsMockData.json"

export default function MorePage() {
  function renderItem(data) {
    return <MorePageCard pinsData={data} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={data}
        keyExtractor={(data, index) => index.toString()}
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
