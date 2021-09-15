import axios from "axios";
import { API_SERVER_URL } from "@env";
import * as SecureStore from "expo-secure-store";

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

    return { success: "ok" };
  } catch (err) {
    console.log(err);
  }
}
