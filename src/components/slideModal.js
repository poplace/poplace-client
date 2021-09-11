import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";

import { selectModalOn } from "../features/modalVisibleSlice";
import { selectCurrentPin } from "../features/pinSlice";
import { turnOnOffModal } from "../features/modalVisibleSlice";

export default function SlideModal() {
  const dispatch = useDispatch();
  const modalVisibleStatus = useSelector(selectModalOn);
  const currentPinInfo = useSelector(selectCurrentPin);

  function handleModalVisible() {
    dispatch(turnOnOffModal());
  }

  //이미지를 보여줘야 한다.
  //남은시간 현재 시간이랑 계산 해서 보여줘야 한다
  //태그를 보여줘야 한다
  //텍스트를 보여줘야 한다

  return (
    <View style={styles.modalContainer}>
      <Modal
        isVisible={modalVisibleStatus}
        animationType="slide"
        backdropOpacity={0}
        onBackButtonPress={handleModalVisible}
        onBackdropPress={handleModalVisible}
      >
        <View style={styles.modal}>
          <Text>{JSON.stringify(currentPinInfo)}</Text>
        </View>
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
