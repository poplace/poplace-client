import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button({ text, navigation }) {
  function handleNextButton() {
    if (text === "다음") {
      navigation.navigate("NewNickname");
    }
  }

  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleNextButton}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    paddingHorizontal: "30%",
    paddingVertical: "2.5%",
    borderRadius: 50,
    backgroundColor: "#f78582",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
  },
});
