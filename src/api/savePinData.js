import axios from "axios";
import { API_SERVER_URL } from "@env";

export default async function savePinData(pinId, userId) {
  try {
    await axios.put(
      `${API_SERVER_URL}/pins/${pinId}`,
      {
        pinId,
        userId,
      },
    );

    return { success: "ok" };
  } catch (err) {
    console.log(err);
  }
}
