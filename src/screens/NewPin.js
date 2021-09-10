import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { API_SERVER_URL } from "@env";
import * as Location from "expo-location";
import Textarea from "react-native-textarea";
import TagInput from "react-native-tags-input";
import axios from "axios";

import { selectUser } from "../features/userSlice";
import validateTag from "../utils/validateTag";
import validatePinData from "../utils/validatePinData";

export default function NewPin({ navigation }) {
  const { id } = useSelector(selectUser);
  const [tags, setTags] = useState({
    tag: "",
    tagsArray: [],
  });
  const [text, setText] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  function handleUpdateTag(tags) {
    const isValid = validateTag(tags);

    if (!isValid) {
      return;
    }

    setTags(tags);
  }

  function handleTextAreaInput(input) {
    setText(input);
  }

  async function handleSubmitdata() {
    const data = {
      tags: tags.tagsArray,
      text,
      imageUri,
    };

    const isValid = validatePinData(data);

    if (!isValid) {
      return;
    }

    try {
      const currentLocation = await Location.getCurrentPositionAsync({});

      const {
        coords: { longitude, latitude },
      } = currentLocation;

      await axios.post(`${API_SERVER_URL}/pins`, {
        ...data,
        creator: id,
        coords: [longitude, latitude],
      }, {
        headers: {
          "Content-Type": "application/json"
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function openImagePickerAsync() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");

      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (pickerResult.uri) {
      setImageUri(pickerResult.uri);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
      <View style={styles.addingImageContainer}>
        <View style={styles.addingImageStroke}>
          <TouchableOpacity
            style={styles.addingImage}
            onPress={openImagePickerAsync}
            activeOpacity={1}
          >
            <FontAwesome name="camera" size={40} color="#766162" />
            <Text style={styles.addingImageText}>1</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        title="완료"
        onPress={handleSubmitdata}
      />
      <View style={styles.tagContainer}>
        <Text style={styles.tagTitle}>#tag</Text>
        <TagInput
          style={styles.tag}
          updateState={handleUpdateTag}
          placeholder="태그를 입력하고 enter를 눌러주세요"
          tags={tags}
          keysForTag={'enter'}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>여기에 장소에 대한 느낌을 적어주세요.</Text>
      </View>
      <Textarea style={styles.textInput} onChangeText={handleTextAreaInput}></Textarea>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addingImageContainer: {
    justifyContent: "center",
    marginTop: 10,
    width: "80%",
    height: "20%",
    paddingBottom: 10,
    borderColor: "#d3cdcd",
    borderBottomWidth: 1,
  },
  addingImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  addingImageText: {
    color: "#766162",
  },
  addingImageStroke: {
    borderColor: "#766162",
    borderWidth: 1,
    borderRadius: 10,
    width: "30%",
    height: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  tagContainer: {
    flex: 0.2,
    marginTop: 10,
    width: "80%",
    borderColor: "#d3cdcd",
    borderBottomWidth: 1,
  },
  tag: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#d3cdcd",
    width: "100%",
  },
  tagTitle: {
    margin: 10,
    color: "#766162",
  },
  textContainer: {
    width: "80%",
    height: "5%",
    paddingTop: 10,
  },
  text: {
    color: "#766162",
  },
  textInput: {
    marginTop: 10,
    borderWidth: 1,
    height: "200%",
    borderColor: "#766162",
  }
});
