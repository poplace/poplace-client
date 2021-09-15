import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import getDate from "../utils/getDate";
import { selectUser } from "../features/userSlice";
import { color, horizontalScale, moderateScale, verticalScale } from "../config/globalStyles";
import savePinData from "../api/savePinData";
import { selectCurrentPin } from '../features/currentPinSlice';
import { MESSAGE } from "../constants/shared";

export default function DetailPinScreen({ navigation }) {
  const { id: userId } = useSelector(selectUser);
  const {
    pinId,
    image,
    tags,
    createdAt,
    savedAt,
    text,
    creator,
    savedUser,
  } = useSelector(selectCurrentPin);
  const isCreator = userId === creator;
  const isSavedUser = userId === savedUser;
  const [remainTime, setRemainTime] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (isCreator && savedAt) {
        const timeInfo = getDate(savedAt);

        if (!timeInfo) {
          return setRemainTime(MESSAGE.pinTimeOver);
        }

        return setRemainTime(`남은시간 ${timeInfo}`);
      }

      if (isCreator && !savedAt) {
        const timeInfo = getDate(createdAt);

        if (!timeInfo) {
          return setRemainTime(MESSAGE.pinTimeOver);
        }

        return setRemainTime(`남은시간 ${timeInfo}`);
      }

      if (isSavedUser) {
        const timeInfo = getDate(savedAt);

        if (!timeInfo) {
          return navigation.goBack();
        }

        return setRemainTime(`남은시간 ${timeInfo}`);
      }

      const timeInfo = getDate(createdAt);

      setRemainTime(`남은시간 ${timeInfo}`);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  async function handleSavePin() {
    try {
      const result = await savePinData(pinId, userId);

      if (result.success === "ok") {
        alert("핀이 저장 되었습니다!");
        return navigation.replace("HomeScreen");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: image[0],
        }}
      />
      <View style={styles.timeContainer}>
        <View style={styles.time}>
          <Text style={styles.timeText}>{remainTime}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {!isCreator && !isSavedUser &&
          <TouchableOpacity
            text="저장하기"
            style={styles.button}
            onPress={handleSavePin}
          >
            <Text style={styles.buttonText}>저장하기</Text>
          </TouchableOpacity>}
      </View>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => <Text key={`${pinId}${index}`} style={styles.tag}>{tag}</Text>)}
      </View>
      <ScrollView style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.poplaceWhite,
  },
  image: {
    flex: 2,
    width: "100%",
  },
  timeContainer: {
    marginTop: verticalScale(15),
    marginBottom: verticalScale(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "80%",
  },
  time: {
    justifyContent: "center",
  },
  timeText: {
    fontSize: moderateScale(18),
    fontWeight: "700",
    color: color.poplaceDark,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    color: color.poplaceWhite,
    fontWeight: "700",
    backgroundColor: color.poplaceRed,
    borderRadius: moderateScale(50),
    marginHorizontal: horizontalScale(5),
    marginVertical: verticalScale(10),
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(20),
  },
  buttonText: {
    color: color.poplaceWhite,
    fontSize: moderateScale(15),
    fontWeight: "700",
  },
  tagContainer: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: verticalScale(5),
    padding: verticalScale(8),
    borderBottomColor: color.poplaceMiddleGray,
    borderTopColor: color.poplaceMiddleGray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  tag: {
    color: color.poplaceRed,
    fontWeight: "700",
    backgroundColor: color.poplaceWhite,
    borderRadius: moderateScale(50),
    marginHorizontal: horizontalScale(5),
    marginVertical: verticalScale(10),
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
    shadowColor: "#000000",
    shadowOpacity: 0.01,
    elevation: 2,
  },
  textContainer: {
    flex: 0.8,
    width: "80%",
  },
  text: {
    color: color.poplaceLight,
    fontSize: moderateScale(16),
    marginVertical: verticalScale(10),
    lineHeight: verticalScale(20),
  },
});
