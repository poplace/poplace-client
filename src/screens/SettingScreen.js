import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";

import { ALERT_MESSAGE } from "../constants/screens";
import { logoutUser, selectUser } from "../features/userSlice";
import { verticalScale, horizontalScale, color } from "../config/globalStyles";
import asyncDeleteAccount from "../api/deleteAccount";

export default function SettingScreen({ navigation }) {
  const [toggleOn, setToggleOn] = useState(true);
  const { id } = useSelector(selectUser);
  const dispatch = useDispatch();

  function handleChangeNickname() {
    navigation.navigate("NewNicknameScreen");
  }

  function handleLogout() {
    dispatch(logoutUser());

    Alert.alert(ALERT_MESSAGE.title, ALERT_MESSAGE.logout, [{
      text: ALERT_MESSAGE.accept,
      onPress: () => navigation.reset({
        index: 0,
        routes: [{ name: "Login" }]
      }),
    }]);
  }

  function deleteAccount() {
    asyncDeleteAccount(id);

    dispatch(logoutUser());

    Alert.alert(ALERT_MESSAGE.title, ALERT_MESSAGE.deleteAccount, [{
      text: ALERT_MESSAGE.accept,
      onPress: () => navigation.reset({
        index: 0,
        routes: [{ name: "Login" }]
      }),
    }])
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentBox}>
        <Text style={styles.text}>푸시 알림</Text>
        <SwitchToggle
          switchOn={toggleOn}
          onPress={() => setToggleOn(!toggleOn)}
          circleColorOff={color.poplaceRed}
          circleColorOn={color.poplaceRed}
          backgroundColorOn="white"
          backgroundColorOff={color.poplaceMiddleGray}
          containerStyle={styles.toggleContainer}
          circleStyle={styles.toggleCircle}
        ></SwitchToggle>
      </View>
      <TouchableOpacity style={styles.contentBox} onPress={handleChangeNickname}>
        <Text style={styles.text}>닉네임 변경</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contentBox} onPress={handleLogout}>
        <Text style={styles.text}>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contentBox} onPress={deleteAccount}>
        <Text style={[styles.text, styles.deleteAccount]}>탈퇴하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "1%",
    backgroundColor: "white",
  },
  contentBox: {
    position: "relative",
    height: verticalScale(70),
    width: horizontalScale(315),
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "white",
    borderBottomWidth: 0.1,
    borderColor: color.poplaceGrayColor,
  },
  text: {
    left: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteAccount: {
    color: "gray",
  },
  toggleContainer: {
    height: verticalScale(28),
    width: horizontalScale(60),
    marginTop: 16,
    borderRadius: 30,
    padding: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 5,
  },
  toggleCircle: {
    height: verticalScale(22),
    width: horizontalScale(22),
    borderRadius: 20,
  },
});
