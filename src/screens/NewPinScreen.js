import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { API_SERVER_URL } from "@env";
import * as Location from "expo-location";
import Textarea from "react-native-textarea";
import TagInput from "react-native-tags-input";
import axios from "axios";

import { selectUser } from "../features/userSlice";
import validateTag from "../utils/validateTag";
import validatePinData from "../utils/validatePinData";
import openImagePicker from "../api/openImagePicker";

export default function NewPinScreen({ navigation }) {
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

  async function handleSubmitData() {
    const validatedData = {
      tags: tags.tagsArray,
      text,
      imageUri,
    };

    const isValid = validatePinData(validatedData);

    if (!isValid) {
      return;
    }

    const photo = {
      uri: imageUri,
      name: `new-pin-photo.${imageUri.split(".").pop()}`,
      type: "multipart/form-data",
    };

    try {
      const currentLocation = await Location.getCurrentPositionAsync({});
      const data = new FormData();
      const {
        coords: { longitude, latitude },
      } = currentLocation;

      const stringifiedTags = JSON.stringify(tags.tagsArray);
      const stringifiedCoords = JSON.stringify([longitude, latitude]);

      data.append("photo", photo);
      data.append("text", text);
      data.append("creator", id);
      data.append("tags", stringifiedTags);
      data.append("coords", stringifiedCoords);
      console.log(data);
      await axios.post(
        `${API_SERVER_URL}/pins`,
        data,
        {
          text,
          creator: id,
          tags: stringifiedTags,
          coords: stringifiedCoords,
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
    } catch (err) {
      console.log(err);
    }
  }

  async function handlerImagePicker() {
    const imageResult = await openImagePicker();

    if (imageResult) {
      setImageUri(imageResult);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
      <View style={styles.addingImageContainer}>
        <View style={styles.addingImageStroke}>
          <TouchableOpacity
            style={styles.addingImage}
            onPress={handlerImagePicker}
            activeOpacity={1}
          >
            <FontAwesome name="camera" size={40} color="#766162" />
            <Text style={styles.addingImageText}>1</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button title="완료" onPress={handleSubmitData} />
      <View style={styles.tagContainer}>
        <Text style={styles.tagTitle}>#tag</Text>
        <TagInput
          style={styles.tag}
          updateState={handleUpdateTag}
          placeholder="태그를 입력하고 enter를 눌러주세요"
          tags={tags}
          keysForTag={"enter"}
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
  },
});
