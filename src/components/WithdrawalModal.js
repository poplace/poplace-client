import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal } from "react-native";

import { color } from "../config/globalStyles";
import ModalContainer from "./shared/ModalContainer";
import { ALERT_MESSAGE } from "../constants/screens";

export default function WithdrawalModal({ isVisibleModal, handleVisibleModal, userId }) {
  async function handleWithdrawal() {
    try {
      await axios.delete(`${API_SERVER_URL}/users/delete`, { data: { userId } });

      dispatch(logoutUser());

      Alert.alert(ALERT_MESSAGE.title, ALERT_MESSAGE.deleteAccount, [{
        text: ALERT_MESSAGE.accept,
        onPress: () => navigation.reset({
          index: 0,
          routes: [{ name: "Login" }]
        }),
      }]);

      navigation.navigate("Login");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <Modal visible={isVisibleModal} transparent={true}>
      <ModalContainer>
        <View style={styles.container}>
          <Text style={styles.titleImoji}>⚠️</Text>
          <Text style={styles.titleText}>정말로{"\n"}탈퇴하시겠어요?</Text>
          <Text style={styles.subTitle}>지금까지 생성한 핀이 모두 삭제됩니다.</Text>
          <TouchableOpacity
            style={styles.withdrawalButton}
            activeOpacity={0.5}
            onPress={handleWithdrawal}
          >
            <Text style={styles.withdrawalText}>탈퇴하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={handleVisibleModal}>
            <Image source={require("../assets/closeButton.png")} />
          </TouchableOpacity>
        </View>
      </ModalContainer>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: "45%",
    backgroundColor: color.poplaceWhite,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  titleImoji: {
    marginBottom: 10,
    fontSize: 60,
  },
  titleText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
  },
  subTitle: {
    color: color.poplaceLight,
    marginTop: 15,
    marginBottom: 5,
    textAlign: "center",
    fontSize: 12,
  },
  withdrawalText: {
    color: color.poplaceWhite,
    fontSize: 18,
    fontWeight: "700",
  },
  withdrawalButton: {
    marginTop: 15,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: color.poplaceRed,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
