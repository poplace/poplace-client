import axios from "axios";
import { API_SERVER_URL } from "@env";
import * as SecureStore from "expo-secure-store";

export default async function getPinDetailData(pinId, routeName) {
  try {
    const token = await SecureStore.getItemAsync("token");

    const response = axios.get(
      `${API_SERVER_URL}/pins/${pinId}`,
      {
        params: { routeName }
      },
      {
        headers: {
          Authorization: "Bearer" + token,
        },
      },
    );

    const { image, tag, createdAt, savedAt, text } = response.data;

    return { image, tag, createdAt, savedAt, text };
  } catch (err) {
    console.log(err);
  }
}
