import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { addNickname, selectUser } from "../../features/userSlice";
import { API_SERVER_URL } from "@env";
import axios from "axios";

export default function Button({ text, nickname, recommendedNickname, navigation }) {
  const dispatch = useDispatch();
  const info = useSelector(selectUser);

  async function handleNextButton() {
    if (text === "다음") {
      navigation.navigate("NewNickname");
    } else {
      const finalNickname = nickname || recommendedNickname;

      dispatch(addNickname(finalNickname));

      const photo = {
        uri: info.image,
        name: "new-photo.jpg",
        type: "multipart/form-data",
      };

      const data = new FormData();
      data.append("photo", photo);

      const result = await axios.post(`${API_SERVER_URL}/users/signup`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
  }

  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleNextButton}>
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
    backgroundColor: "#f78582",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
  },
});
