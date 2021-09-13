import { API_SERVER_URL } from "@env";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default async function fetchMyPins(userId, email) {
  try {
    const token = await SecureStore.getItemAsync("token");

    const response = await axios.get(`${API_SERVER_URL}/pins/${userId}`, {
      params: {
        email,
      },
      validateStatus: (state) => state < 500,
      headers: {
        Authorization: "Bearer " + token,
      }
    });

    if (response.data.code === 400) {
      console.log(response.data.code);
      return;
    }

    const { myCreatedPins, mySavedPins } = response.data;

    return { myCreatedPins, mySavedPins };
    // setMyCreatedPins(myCreatedPins);
    // setMySavedPins(mySavedPins);
  } catch (err) {
    console.log(err);
  }
}
