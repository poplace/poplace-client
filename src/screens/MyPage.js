import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { selectUser } from "../features/userSlice";

export default function MyPage({ navigation }) {
  const info = useSelector(selectUser);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileStroke}>
          <TouchableOpacity onPress={() => console.log("이미지 바꾸기")} activeOpacity={1}>
            <Image
              style={styles.profile}
              source={{
                uri: info.image,
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{info.nickname}</Text>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.myPinsContainer}>
          <Text style={styles.myPinsText}>내가 생성한 핀</Text>
          <Text style={styles.moreText}>더보기 {">"}</Text>
        </View>

        <ScrollView horizontal style={styles.pinsListContainer}>
          <TouchableOpacity style={styles.pins} activeOpacity={1} onPress={() => console.log("콘텐츠임..")}>
            <Text>여기가 콘텐츠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pins} activeOpacity={1} onPress={() => console.log("콘텐츠임..")}>
            <Text>여기가 콘텐츠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pins} activeOpacity={1} onPress={() => console.log("콘텐츠임..")}>
            <Text>여기가 콘텐츠</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.myPinsContainer}>
          <Text style={styles.myPinsText}>내가 생성한 핀</Text>
          <Text style={styles.moreText}>더보기 {">"}</Text>
        </View>

        <ScrollView horizontal style={styles.pinsListContainer}>
          <TouchableOpacity style={styles.pins} activeOpacity={1} onPress={() => console.log("콘텐츠임..")}>
            <Text>여기가 콘텐츠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pins} activeOpacity={1} onPress={() => console.log("콘텐츠임..")}>
            <Text>여기가 콘텐츠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pins} activeOpacity={1} onPress={() => console.log("콘텐츠임..")}>
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
    backgroundColor: "#ffffff",
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    top: "5%",
  },
  profile: {
    position: "relative",
    width: 130,
    height: 130,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  profileStroke: {
    marginBottom: 20,
    width: 140,
    height: 140,
    borderRadius: 100,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  title: {
    color: "#453536",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  listContainer: {
    height: "60%",
    paddingLeft: "7%",
  },
  myPinsContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  myPinsText: {
    color: "#453536",
    fontSize: 18,
    fontWeight: "700",
  },
  moreText: {
    marginLeft: "3%",
    color: "gray"
  },
  pinsListContainer: {
    marginVertical: "7%",
  },
  pins: {
    justifyContent: "space-between",
    marginRight: 20,
    width: 130,
    height: 130,
    borderRadius: 15,
    backgroundColor: "blue",
  },
});
