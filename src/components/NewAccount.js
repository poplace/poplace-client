import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function NewAccount() {
  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");

      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addingProfileStroke}>
        <TouchableOpacity onPress={openImagePickerAsync} activeOpacity={1}>
          <View style={styles.addingProfile}>
            <Feather name="plus" size={80} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>프로필 이미지를{"\n"}넣어주세요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
