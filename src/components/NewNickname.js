import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { API_SERVER_URL, DEFAULT_IMAGE } from "@env";
import axios from "axios";

import Button from "./shared/Button";
import generateNickname from "../utils/nicknameGenerator";
import { addNickname, addImage, selectUser } from "../features/userSlice";

export default function NewNickname({ navigation }) {
  const [nickname, setNickname] = useState("");
  const [recommendedNickname, setRecommendedNickname] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const info = useSelector(selectUser);

  useEffect(() => {
    setRecommendedNickname(generateNickname());
  }, []);

  function clearText() {
    setNickname("");
  }

  async function fetchProfile() {
    const finalNickname = nickname || recommendedNickname;
    const image = info.image || DEFAULT_IMAGE;

    dispatch(addNickname(finalNickname));
    dispatch(addImage(image));

    const photo = {
      uri: image,
      name: `new-photo.${image.split(".").pop()}`,
      type: "multipart/form-data",
    };

    const data = new FormData();
    data.append("photo", photo);
    data.append("email", info.email);

    try {
      const nicknameResult = await axios.post(
        `${API_SERVER_URL}/users/signup`,
        {
          email: info.email,
          nickname: finalNickname,
        },
        {
          validateStatus: (status) => status < 500,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (nicknameResult.data.code === 400) {
        setIsError(true);
        setErrorMessage(nicknameResult.data.message);
        return;
      }

      await axios.post(`${API_SERVER_URL}/users/signup`, data);

      navigation.replace("bottom");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <View style={styles.nicknameContainer}>
        <View style={styles.textContainer}>
          <TextInput
            style={isError ? errorStyles.textInput : styles.textInput}
            onChangeText={(e) => setNickname(e)}
            value={nickname}
            placeholder={recommendedNickname}
            clearButtonMode="always"
          />
          <TouchableOpacity style={styles.xButton} onPress={clearText}>
            <Feather name="x" size={12} color="#453536" />
          </TouchableOpacity>
        </View>
        <View style={errorStyles.errorContainer}>
          {isError && <Text style={errorStyles.errorText}>{errorMessage}</Text>}
        </View>
        <Text style={styles.title}>닉네임을{"\n"}입력해주세요</Text>
      </View>
      <View style={styles.nextButtonContainer}>
        <Button
          text="완료"
          handleButton={fetchProfile}
        />
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

const errorStyles = StyleSheet.create({
  textInput: {
    height: 40,
    fontSize: 20,
    borderColor: "#fe4e4e",
    borderBottomWidth: 1,
  },
  errorText: {
    textAlign: "left",
    color: "#fe4e4e"
  },
});