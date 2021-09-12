import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import getDate from "../utils/getDate";
import { selectUser } from "../features/userSlice";
import { color } from "../config/globalStyles";

export default function DetailPin({ navigation, route }) {
  const { id } = useSelector(selectUser);
  const { image, tags, createdAt, savedAt, text, creator, savedUser } = route.params.data;
  const isCreator = id === creator;
  const isSavedUser = id === savedUser;
  const [remainTime, setRemainTime] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (isCreator && savedAt) {
        const timeInfo = getDate(savedAt);

        if (!timeInfo) {
          return setRemainTime(null);
        }

        return setRemainTime(timeInfo);
      }

      if (isCreator && !savedAt) {
        const timeInfo = getDate(createdAt);

        if (!timeInfo) {
          return setRemainTime(null);
        }

        return setRemainTime(timeInfo);
      }

      if (isSavedUser) {
        const timeInfo = getDate(savedAt);

        if (!timeInfo) {
          return navigation.navigate("Main");
        }

        return setRemainTime(timeInfo);
      }

      const timeInfo = getDate(createdAt);

      setRemainTime(timeInfo);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <View style={styles.timeContainer}>
        <View style={styles.time}>
          <Text style={styles.timeText}>남은시간: {remainTime}</Text>
        </View>
        {!isCreator && !isSavedUser &&
          <TouchableOpacity text="저장하기" style={styles.button}>
            <Text style={styles.buttonText}>저장하기</Text>
          </TouchableOpacity>
        }
      </View>
      <View style={styles.tagContainer}></View>
      {tags.map((tag) => {
        <Text style={styles.tag}>#{tag}</Text>
      })}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
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
    width: "80%",
    borderColor: color.poplaceGrayColor,
    borderBottomWidth: 1,
  },
  time: {
    justifyContent: "center",
  },
  timeText: {
    color: color.poplacelightColor,
  },
  button: {
    backgroundColor: color.poplaceRedColor,
    borderRadius: 15,
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: color.poplaceWhiteColor,
  },
  textContainer: {
    flex: 0.8,
    width: "80%",
  },
  text: {
    color: color.poplacelightColor,
  },
  tagContainer: {
    flexWrap: "wrap",
    marginTop: 10,
  },
  tag: {
    color: color.poplaceWhiteColor,
    fontWeight: "700",
    backgroundColor: color.poplaceRedColor,
    borderRadius: 15,
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
