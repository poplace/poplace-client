import axios from "axios";
import { API_SERVER_URL } from "@env";

export default async function savePinData(pinId) {
  try {
    await axios.put(
      `${API_SERVER_URL}/pins/${pinId}`,
      { pinId },
    );

    return { success: "ok" };
  } catch (err) {
    console.log(err);
  }
}
