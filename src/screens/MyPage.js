import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

import { selectUser } from "../features/userSlice";
import { width, height, color, verticalScale, horizontalScale, moderateScale } from "../config/globalStyles";
import { DEFAULT_IMAGE } from "@env";

export default function MyPage({ navigation }) {
  const info = useSelector(selectUser);

  console.log(width, height)

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileStroke}>
          <TouchableOpacity onPress={() => console.log("이미지 바꾸기")} activeOpacity={1}>
            <Image
              style={styles.profile}
              source={{
                uri: info.image || DEFAULT_IMAGE,
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>정적인아이디</Text>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.myPinsContainer}>
          <Text style={styles.myPinsText}>내가 생성한 핀</Text>
          <Text style={styles.moreText} onPress={() => console.log("더보기..")}>더보기 {">"}</Text>
        </View>

        <ScrollView horizontal style={styles.pinsListContainer}>
          <TouchableOpacity style={styles.pins} activeOpacity={1} onPress={() => console.log("콘텐츠..")}>
            <Text>여기가 콘텐츠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pins} activeOpacity={1} onPress={() => console.log("콘텐츠..")}>
            <Text>여기가 콘텐츠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pins} activeOpacity={1} onPress={() => console.log("콘텐츠..")}>
            <Text>여기가 콘텐츠</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.myPinsContainer}>
          <Text style={styles.myPinsText}>내가 생성한 핀</Text>
          <Text style={styles.moreText} onPress={() => console.log("더보기..")}>더보기 {">"}</Text>
        </View>

        <ScrollView horizontal style={styles.pinsListContainer}>
          <TouchableOpacity style={styles.pins} activeOpacity={1} onPress={() => console.log("콘텐츠..")}>
            <Text>여기가 콘텐츠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pins} activeOpacity={1} onPress={() => console.log("콘텐츠..")}>
            <Text>여기가 콘텐츠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pins} activeOpacity={1} onPress={() => console.log("콘텐츠..")}>
            <Text>여기가 콘텐츠</Text>
          </TouchableOpacity>
        </ScrollView>
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
    width: horizontalScale(90),
    height: verticalScale(90),
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
  listContainer: {
    height: verticalScale(340),
    paddingLeft: "7%",
    bottom: "1%",
  },
  myPinsContainer: {
    top: "14%",
    alignItems: "center",
    flexDirection: "row",
  },
  myPinsText: {
    color: color.poplaceDarkColor,
    fontSize: moderateScale(16),
    fontWeight: "700",
  },
  moreText: {
    fontSize: moderateScale(12),
    marginLeft: "3%",
    color: color.poplaceGrayColor,
  },
  pinsListContainer: {
    top: "10%",
    marginTop: "5%",
    padding: "1%",
    width: "100%",
    backgroundColor: "red",
  },
  pins: {
    justifyContent: "space-between",
    marginRight: moderateScale(12),
    width: horizontalScale(120),
    height: verticalScale(120),
    borderRadius: 15,
    backgroundColor: "blue",
  },
});
