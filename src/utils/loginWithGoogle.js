import * as Google from "expo-google-app-auth";
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from "@env";

export default async function loginWithGoogle() {
  try {
    const result = await Google.logInAsync({
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      const { email } = result.user;

      return { user: { email } };
    }

    return { cancelled: true };
  } catch (err) {
    alert(err.message);
  }
}
