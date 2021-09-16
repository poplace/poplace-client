import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Image, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

import { signinUser, selectUser } from "../features/userSlice";
import loginWithGoogle from "../utils/loginWithGoogle";
import { ERROR_MESSAGE } from "../constants/screens";
import { color, moderateScale, verticalScale } from "../config/globalStyles";
import CustomButton from "../components/shared/CustomButton";

export default function LoginScreen({ navigation }) {
  const isSuccess = useSelector((state) => state.user.status === "success");
  const [errorMessage, setErrorMessage] = useState("");
  const { isOriginalMember, nickname } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      if (!isOriginalMember || !nickname) {
        return navigation.replace("NewAccountNavigator");
      }

      return navigation.replace("MainNavigator");
    }
  }, [isSuccess]);

  function handleErrorMessage(message) {
    setErrorMessage(message);
  }

  async function handleGoogleLogin() {
    try {
      await SecureStore.deleteItemAsync("token");

      const result = await loginWithGoogle();
      const user = result.user;

      if (!user) {
        return handleErrorMessage(ERROR_MESSAGE.cancelLogin);
      }

      dispatch(signinUser(user));
      handleErrorMessage("");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/poplace.png")} />
      <Image source={require("../assets/villige.png")} />

      <View style={styles.buttonContainer}>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <CustomButton style={styles.button} text="구글로 시작하기" handleButton={handleGoogleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff9f6",
  },
  logo: {
    position: "absolute",
    top: verticalScale(160),
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: verticalScale(40),
  },
  errorMessage: {
    marginBottom: verticalScale(10),
    color: color.poplaceErrorRed,
    fontSize: moderateScale(15),
  },
});
