import React from "react";
import { View, Modal, StyleSheet } from "react-native";

const ModalContainer = ({ children }) => {
  return (
    <Modal
      visible={true}
      transparent={true}
      onRequestClose={() => console.log("뒤로가기")}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalBackgroud} />
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalBackgroud: {
    position: "absolute",
    opacity: 0.5,
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
  },
});

export default ModalContainer;
