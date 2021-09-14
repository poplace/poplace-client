import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";

import { selectModalOn } from "../features/modalVisibleSlice";
import { turnOnOffModal } from "../features/modalVisibleSlice";
import { color, width, height, verticalScale, horizontalScale, moderateScale } from "../config/globalStyles";
import getDate from "../utils/getDate";

export default function SlideModal() {
  const [remainTime, setRemainTime] = useState(null);
  const modalVisibleStatus = useSelector(selectModalOn);
  const currentPinInfo = useSelector(selectCurrentPin);
  const dispatch = useDispatch();

  function handleModalVisible() {
    dispatch(turnOnOffModal());
  }

  const { image, tag, text, createdAt } = currentPinInfo;

  useEffect(() => {
    const id = setInterval(() => {
      const timeInfo = getDate(createdAt);

      if (!timeInfo) {
        setRemainTime("시간이 초과 되었습니다");
        return;
      }

      return setRemainTime(`남은시간 ${timeInfo}`);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [createdAt]);

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
          <View style={styles.textContainer}>
            <Text style={styles.timeText}>
              {remainTime}
            </Text>
          </View>

          <View style={styles.listContainer}>

            <View style={styles.test}>
              <View style={styles.bodyContainer}>
                {tag.map((text, index) => {
                  return <Text key={index} style={styles.tagsText}>{text}</Text>
                })}
              </View>
              <View style={styles.textBox}>
                <Text style={styles.text}>{text}</Text>
              </View>
            </View>

            <Image
              style={styles.previewContainer}
              source={{ uri: image[0] }}
            />
          </View>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>저장하기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width,
    height,
    flex: 1,
  },
  modal: {
    position: "absolute",
    flex: 1,
    width: horizontalScale(320),
    height: verticalScale(200),
    backgroundColor: "white",
    alignItems: "center",
    bottom: -21,
    marginLeft: moderateScale(-10),
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  test: {
    width: horizontalScale(160),
    height: verticalScale(110),

  },
  listContainer: {
    width: horizontalScale(280),
    height: verticalScale(90),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  previewContainer: {
    height: verticalScale(90),
    width: horizontalScale(90),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  textContainer: {
    top: 2,
    marginLeft: verticalScale(10),
    padding: moderateScale(20),
  },
  timeText: {
    fontSize: moderateScale(15),
    color: color.poplaceDark,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  bodyContainer: {
    flexDirection: "row",
    marginTop: verticalScale(5),
  },
  tagsText: {
    color: color.poplaceWhite,
    backgroundColor: color.poplaceRed,
    fontSize: moderateScale(11),
    textAlign: "center",
    fontWeight: "700",
    borderRadius: 30,
    marginRight: horizontalScale(5),
    paddingVertical: verticalScale(4),
    paddingHorizontal: moderateScale(12),
  },
  textBox: {
    bottom: moderateScale(6),
    position: "absolute",
    width: horizontalScale(170),
  },
  text: {
    color: color.poplaceGray,
    marginTop: verticalScale(5),
    fontSize: moderateScale(13),
  },
  saveButton: {
    top: 10,
    backgroundColor: color.poplaceRed,
    textAlign: "center",
    fontWeight: "700",
    borderRadius: 30,
    marginRight: horizontalScale(5),
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(24),
  },
  saveButtonText: {
    color: color.poplaceWhite,
    fontSize: moderateScale(12),
  },
});
