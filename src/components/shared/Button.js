import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { color } from "../../config/globalStyles";

export default function Button({ text, handleButton }) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleButton}>
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
    backgroundColor: color.poplaceRed,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: color.poplaceWhite,
    fontSize: 24,
    fontWeight: "700",
  },
});
