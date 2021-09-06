import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";

import ModalContainer from "./shared/ModalContainer";

const WithdrawalModal = () => {
  const [isVisible, setIsVisible] = useState(true);
  const handleModal = () => {
    setIsVisible((state) => !state);
  };

  const handleWithdrawal = () => {
    console.log("탈퇴하기");
  };

  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={handleModal}>
      <ModalContainer>
        <View style={styles.container}>
          <Text style={styles.titleImoji}>⚠️</Text>
          <Text style={styles.titleText}>정말로{"\n"}탈퇴하시겠어요?</Text>
          <Text style={styles.subTitle}>
            지금까지 생성한 핀이 모두 삭제됩니다.
          </Text>
          <TouchableOpacity
            style={styles.withdrawalButton}
            activeOpacity={0.5}
            onPress={handleWithdrawal}
          >
            <Text style={styles.withdrawalText}>탈퇴하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={handleModal}>
            <Image source={require("../assets/closeButton.png")} />
          </TouchableOpacity>
        </View>
      </ModalContainer>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: "45%",
    backgroundColor: "#ffffff",
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
    color: "#766162",
    marginTop: 15,
    marginBottom: 5,
    textAlign: "center",
    fontSize: 12,
  },
  withdrawalText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  withdrawalButton: {
    marginTop: 15,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: "#f78582",
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

export default WithdrawalModal;
