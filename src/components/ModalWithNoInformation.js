import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal } from "react-native";
import { color } from "../config/globalStyles";

import ModalContainer from "./shared/ModalContainer";

export default function ModalWithNoInformation() {
  const [isVisible, setIsVisible] = useState(true);

  function handleModal() {
    setIsVisible((state) => !state);
  }

  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={handleModal}>
      <ModalContainer>
        <View style={styles.container}>
          <Text style={styles.titleImoji}>π€§</Text>
          <Text style={styles.titleText}>
            λ μ΄μ μ λ³΄λ₯Ό{"\n"}μ‘°νν  μ μμ΄μ {":("}
          </Text>
          <Text style={styles.subTitle}>{"ν***λμ΄ λ¨κΈ°κ³  κ° νμ λ€"}</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>#λΈμμ΄μλ»</Text>
            <Text style={styles.tag}>#μ¬κΈ°κ°μ’μ</Text>
            <Text style={styles.tag}>#μ¬κΈ°κ°μ’μ</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={handleModal}>
            <Image source={require("../assets/closeButton.png")} />
          </TouchableOpacity>
        </View>
      </ModalContainer>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: "45%",
    backgroundColor: color.poplaceWhite,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  titleImoji: {
    marginBottom: 10,
    fontSize: 60,
  },
  titleText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
  },
  subTitle: {
    color: color.poplaceLight,
    marginTop: 15,
    marginBottom: 5,
    textAlign: "center",
    fontSize: 12,
  },
  tagContainer: {
    position: "relative",
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "row",
  },
  tag: {
    color: color.poplaceWhite,
    fontWeight: "700",
    backgroundColor: color.poplaceRed,
    borderRadius: 15,
    marginHorizontal: 5,
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
