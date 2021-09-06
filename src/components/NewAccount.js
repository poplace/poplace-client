import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Button from "./shared/Button";

export default function NewAccount() {
  const [hasProfile, setHasProfie] = useState(false);
  const [profileImageUri, setProfileImageUri] = useState("");

  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");

      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.uri) {
      setProfileImageUri(pickerResult.uri);
      setHasProfie(true);
    }
  };

  const handleSkipButton = () => {
    console.log("건너뛰기");
  };

  return (
    <>
      <View style={styles.profileContainer}>
        <View style={styles.addingProfileStroke}>
          <TouchableOpacity onPress={openImagePickerAsync} activeOpacity={1}>
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
        <Button text="다음" />
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
