import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";

import { selectModalOn } from "../features/modalVisibleSlice";
import { selectCurrentPin } from "../features/currentPinSlice";
import { turnOnOffModal } from "../features/modalVisibleSlice";
import MorePageCard from "../components/MorePageCard";

export default function SlideModal() {
  const dispatch = useDispatch();
  const modalVisibleStatus = useSelector(selectModalOn);
  const currentPinInfo = useSelector(selectCurrentPin);

  function handleModalVisible() {
    dispatch(turnOnOffModal());
  }

  return (
    <View style={styles.modalContainer}>
      <Modal
        isVisible={modalVisibleStatus}
        animationType="slide"
        backdropOpacity={0}
        onBackButtonPress={handleModalVisible}
        onBackdropPress={handleModalVisible}
      >
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
  modal: {
    position: "absolute",
    width: "111%",
    height: "40%",
    backgroundColor: "white",
    flex: 1,
    bottom: -21,
    marginLeft: -20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});
