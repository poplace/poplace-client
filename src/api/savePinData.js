import axios from "axios";
import { API_SERVER_URL } from "@env";
import * as SecureStore from "expo-secure-store";

import { ERROR_MESSAGE } from "../constants/screens";

export default async function savePinData(pinId, userId) {
  try {
    const token = await SecureStore.getItemAsync("token");

    await axios.put(
      `${API_SERVER_URL}/pins/${pinId}`, {
      pinId,
      userId,
    }, {
      validateStatus: (state) => state < 500,
      headers: {
        Authorization: "Bearer " + token,
      }
    });

    return { success: true };
  } catch (err) {
    alert(ERROR_MESSAGE.cancelSavePin);
  }
}
