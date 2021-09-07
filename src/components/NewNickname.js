import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

import Button from "./shared/Button";
import generateNickname from "../utils/nicknameGenerator";

export default function NewNickname() {
  const [nickname, setNickname] = useState("");
  const [recommendedNickname, setRecommendedNickname] = useState("");

  useEffect(() => {
    setRecommendedNickname(generateNickname());
  }, []);

  function clearText() {
    setNickname("");
  }

  return (
    <>
      <View style={styles.nicknameContainer}>
        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(e) => setNickname(e)}
            value={nickname}
            placeholder={recommendedNickname}
            clearButtonMode="always"
          />
          <TouchableOpacity style={styles.xButton} onPress={clearText}>
            <Feather name="x" size={12} color="#453536" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>닉네임을{"\n"}입력해주세요</Text>
      </View>
      <View style={styles.nextButtonContainer}>
        <Button text="완료" nickname={nickname} recommendedNickname={recommendedNickname} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  nicknameContainer: {
    flex: 1,
    alignItems: "center",
    top: "35%",
  },
  textInput: {
    height: 40,
    fontSize: 20,
    borderColor: "gray",
    borderBottomWidth: 1,
  },
  textContainer: {
    width: "80%",
    justifyContent: "center",
  },
  xButton: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 50,
    right: 10,
    backgroundColor: "#EAEAEA",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    top: 20,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  nextButtonContainer: {
    alignItems: "center",
    bottom: "7%",
  },
  skipButton: {
    fontSize: 16,
    color: "#766162",
  },
});
