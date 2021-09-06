import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button({ text }) {
  const handleNextButton = () => {
    console.log("다음화면");
  };

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={handleNextButton}
    >
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
