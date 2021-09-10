import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import Button from "./shared/Button";
import openImagePicker from "../api/openImagePicker";
import { addImage } from "../features/userSlice";

export default function NewProfileImage({ navigation }) {
  const [profileImageUri, setProfileImageUri] = useState("");
  const [hasProfile, setHasProfile] = useState(false);
  const dispatch = useDispatch();

  async function handleImagePicker() {
    const imageResult = await openImagePicker();

    if (imageResult) {
      dispatch(addImage(imageResult));
      setProfileImageUri(imageResult);
      setHasProfile(true);
    }
  }

  function handleSkipButton() {
    navigation.navigate("NewNickname");
  }

  function handleNext() {
    navigation.navigate("newNickname");
  }

  return (
    <>
      <View style={styles.profileContainer}>
        <View style={styles.addingProfileStroke}>
          <TouchableOpacity onPress={handleImagePicker} activeOpacity={1}>
            {hasProfile ? (
              <Image
                style={styles.addingProfile}
                source={{
                  uri: profileImageUri,
                }}
              />
            ) : (
              <View style={styles.addingProfile}>
                <Feather name="plus" size={80} color="white" />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>프로필 이미지를{"\n"}넣어주세요</Text>
      </View>
      <View style={styles.nextButtonContainer}>
        <Text style={styles.skipButton} onPress={handleSkipButton}>
          건너뛰기
        </Text>
        <Button text="다음" handleButton={handleNext} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
    top: "20%",
  },
  addingProfile: {
    position: "relative",
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: "#766162",
    alignItems: "center",
    justifyContent: "center",
  },
  addingProfileStroke: {
    marginBottom: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  title: {
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
