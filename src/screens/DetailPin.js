import React from 'react'
import { View, Text, StyleSheet, Image, Button } from "react-native";

export default function DetailPin() {
  return (
    <View style={styles.container}>
      <Image style={styles.image}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <View style={styles.timeContainer}>
        <View style={styles.time}>
          <Text>남은시간: 20시간 12분</Text>
        </View>
        <Button title="저장하기" />
      </View>
      <View style={styles.tagContainer}></View>
        <Text style={styles.tag}>#노을이예뻐</Text>
      <View style={styles.textContainer}>
        <Text>dd</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
  },
  timeContainer: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    borderWidth: 1,
  },
  time: {
    justifyContent: "center",
  },
  textContainer: {
    flex: 0.8,
    width: "100%",
    borderWidth: 1,
  },
  tagContainer: {
    flexWrap: "wrap",
    // justifyContent: "center",
    // alignItems: "center",
  },
  tag: {
    color: "#ffffff",
    fontWeight: "700",
    backgroundColor: "#f78582",
    borderRadius: 15,
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
