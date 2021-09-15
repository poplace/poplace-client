import axios from "axios";
import { API_SERVER_URL } from "@env";
import * as SecureStore from "expo-secure-store";

export default async function deleteAccount(id) {
  try {
    const token = await SecureStore.getItemAsync("token");

    await axios.delete(`${API_SERVER_URL}/users/delete`, {
      data: { id },
      validateStatus: (state) => state < 500,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return { success: true };
  } catch (err) {
    alert(err.message);
  }
}
