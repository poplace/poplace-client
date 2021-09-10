import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

import { DEFAULT_IMAGE } from "@env";
import MyPinList from "../components/shared/MyPinList";
import { selectUser, addImage } from "../features/userSlice";
import openImagePicker from "../api/openImagePicker";
import { color, verticalScale, horizontalScale, moderateScale } from "../config/globalStyles";

export default function MyPage({ navigation }) {
  const info = useSelector(selectUser);
  const dispatch = useDispatch();

  async function changeImagePicker() {
    const imageResult = await openImagePicker();

    if (imageResult) {
      dispatch(addImage(imageResult));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileStroke}>
          <TouchableOpacity onPress={changeImagePicker} activeOpacity={1}>
            <Image
              style={styles.profile}
              source={{
                uri: info.image || DEFAULT_IMAGE,
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>정적인아이디</Text>
        <View style={styles.titleUnderLine}></View>
      </View>
      <View style={styles.listContainer}>
        <MyPinList title="내가 생성한 핀" />
        <MyPinList title="내가 저장한 핀" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.poplaceWhiteColor,
  },
  profileContainer: {
    alignItems: "center",
    top: "5%",
  },
  profile: {
    position: "relative",
    width: horizontalScale(80),
    height: verticalScale(80),
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  profileStroke: {
    marginBottom: 20,
    width: horizontalScale(85),
    height: verticalScale(85),
    borderRadius: 100,
    backgroundColor: color.poplaceWhiteColor,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  title: {
    color: color.poplaceDarkColor,
    fontSize: moderateScale(16),
    fontWeight: "700",
    textAlign: "center",
  },
  titleUnderLine: {
    marginVertical: "2%",
    top: "5%",
    width: "85%",
    borderBottomWidth: 1,
    borderColor: color.poplaceLightGrayColor,
  },
  listContainer: {
    height: verticalScale(340),
    paddingLeft: "7%",
    bottom: "1%",
  },
});
