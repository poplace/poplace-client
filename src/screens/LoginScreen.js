import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";

import { signinUser } from "../features/userSlice";
import loginWithGoogle from "../utils/loginWithGoogle";
import { ERROR_MESSAGE } from "../constants/screens";

export default function LoginScreen({ navigation }) {
  const isSuccess = useSelector((state) => state.user.status === "success");
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isSuccess) {
      navigation.replace("bottom");
    }
  }, [isSuccess]);

  function handleErrorMessage(message) {
    setErrorMessage(message);
  }

  async function handleGoogleLogin() {
    try {
      await SecureStore.deleteItemAsync("token");

      const result = await loginWithGoogle();

      if (!result.user) {
        return handleErrorMessage(ERROR_MESSAGE.cancelLogin);
      }

      const user = result.user;

      dispatch(signinUser(user));
      handleErrorMessage("");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.splashImage}>Popplace</Text>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TouchableOpacity onPress={handleGoogleLogin} style={styles.button}>
        <Text style={styles.buttonText}>signin with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  splashImage: {
    marginTop: "6%",
    width: "76%",
    height: "60%",
    borderWidth: 1,
    color: "#000000",
    fontSize: 34,
    fontWeight: "700",
  },
  button: {
    marginTop: "10%",
    width: "76%",
    height: "10.8%",
    borderColor: "#f78582",
    backgroundColor: "#f78582",
    borderRadius: 32,
  },
  buttonText: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 65,
    textAlign: "center",
  },
  errorMessage: {
    marginTop: "5%",
    color: "red",
    fontSize: 15,
  },
});
