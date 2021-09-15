import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import { useDispatch, useSelector } from "react-redux";

import WithdrawalModal from "../components/WithdrawalModal";
import { ALERT_MESSAGE } from "../constants/screens";
import { logoutUser, selectUser } from "../features/userSlice";
import { verticalScale, horizontalScale, color } from "../config/globalStyles";

export default function SettingScreen({ navigation }) {
  const [toggleOn, setToggleOn] = useState(true);
  const { id } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  function handleChangeNickname() {
    navigation.replace("NewNicknameScreen");
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

  function handleVisibleModal() {
    setIsVisibleModal((state) => !state);
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
        <Icon name="chevron-right" color={color.poplaceDark} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.contentBox} onPress={handleLogout}>
        <Text style={styles.text}>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.contentBox}
        onPress={handleVisibleModal}
      >
        <Text style={styles.withDrawalText}>탈퇴하기</Text>
      </TouchableOpacity>
      <WithdrawalModal
        isVisibleModal={isVisibleModal}
        handleVisibleModal={handleVisibleModal}
        userId={id}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "5%",
    backgroundColor: "white",
  },
  contentBox: {
    flexDirection: "row",
    height: verticalScale(70),
    width: horizontalScale(315),
    paddingRight: 7,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.1,
    borderColor: color.poplaceGrayColor,
    paddingTop: "1%",
    backgroundColor: "white",
  },
  text: {
    left: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: color.poplaceDark,
  },
  withDrawalText: {
    left: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: color.poplaceMiddleGray,
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
