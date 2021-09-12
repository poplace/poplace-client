// import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { ERROR_MESSAGE } from "../constants/screens";

export default async function openImagePicker() {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert(ERROR_MESSAGE.cameraAccess);

    return;
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
  });

  if (pickerResult.uri) {
    return pickerResult.uri
  }

  return false;
}
